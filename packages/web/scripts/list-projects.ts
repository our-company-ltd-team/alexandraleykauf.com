#!/usr/bin/env node
/**
 * Script to list all projects with their project rows, panels, and asset counts.
 * Uses Contentful REST API to avoid GraphQL complexity limits.
 *
 * Usage: pnpm list-projects
 */

/* eslint-disable no-console */
import { config } from "dotenv";
import { resolve } from "node:path";

import { createContentfulRestClient } from "./contentful-rest-client.js";

// Load environment variables FIRST, before any other imports
// Note: This script is executed from `packages/web` via pnpm, so `process.cwd()`
// is stable and avoids needing `import.meta` (which breaks under TS NodeNext+CJS).
const webPackageDir = process.cwd();
const workspaceRoot = resolve(webPackageDir, "../..");

const envFiles = [
  resolve(webPackageDir, ".env.local"),
  resolve(webPackageDir, ".env"),
  resolve(workspaceRoot, ".env.local"),
  resolve(workspaceRoot, ".env"),
];

for (const envFile of envFiles) {
  config({ path: envFile });
}

// Type definitions for REST API responses
type ContentfulLink = { sys: { id: string; type?: string } };

type EntryLike<TFields> = {
  sys: {
    id: string;
    contentType?: { sys: { id: string } };
  };
  fields: TFields;
};

type ProjectFields = {
  title?: string;
  slug?: string;
  projectRows?: ContentfulLink[];
};

type ProjectRowFields = {
  title?: string;
  row?: ContentfulLink[];
};

type ImagesPanelFields = {
  title?: string;
  slug?: string;
  images?: ContentfulLink[];
};

type VideosPanelFields = {
  title?: string;
  slug?: string;
  videos?: ContentfulLink[];
};

type TextPageFields = {
  title?: string;
  slug?: string;
};

type TextPanelFields = Record<string, never>;

type ProjectEntry = EntryLike<ProjectFields>;
type ProjectRowEntry = EntryLike<ProjectRowFields>;
type PanelEntry = EntryLike<ImagesPanelFields | VideosPanelFields | TextPageFields | TextPanelFields>;

type ProjectData = {
  project: ProjectEntry;
  projectRows: ProjectRowEntry[];
  panels: PanelEntry[];
  projectRowsCount: number;
  panelsCount: number;
  assetsCount: number;
};

async function main() {
  const client = await createContentfulRestClient({ preview: true });
  const BATCH_SIZE_IDS = 50; // Batch size for fetching entries by ID

  // Step 1: Fetch all projects (paged)
  async function getAllProjects(): Promise<ProjectEntry[]> {
    console.log("Step 1: Fetching all projects...");
    const allProjects: ProjectEntry[] = [];
    let skip = 0;
    const limit = 1000; // Max limit for REST API

    while (true) {
      const response = await client.getEntries<ProjectFields>({
        content_type: "project",
        skip,
        limit,
        select: ["sys", "fields.title", "fields.slug", "fields.projectRows"],
      });

      const projects = response.items as unknown as ProjectEntry[];
      allProjects.push(...projects);

      if (projects.length < limit || skip + limit >= response.total) {
        break;
      }
      skip += limit;
    }

    console.log(`Found ${allProjects.length} projects`);
    return allProjects;
  }

  // Step 2: Collect all projectRow IDs and fetch them in batches
  async function getProjectRowsByIds(projectRowIds: string[]): Promise<Map<string, ProjectRowEntry>> {
    console.log(`Step 2: Fetching ${projectRowIds.length} project rows...`);
    const projectRowsMap = new Map<string, ProjectRowEntry>();

    if (projectRowIds.length === 0) {
      return projectRowsMap;
    }

    // Fetch in batches to avoid URL length limits
    for (let i = 0; i < projectRowIds.length; i += BATCH_SIZE_IDS) {
      const batch = projectRowIds.slice(i, i + BATCH_SIZE_IDS);
      const batchNum = Math.floor(i / BATCH_SIZE_IDS) + 1;
      const totalBatches = Math.ceil(projectRowIds.length / BATCH_SIZE_IDS);
      console.log(`  Fetching batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);

      const response = await client.getEntries<ProjectRowFields>({
        "content_type": "projectRow",
        "sys.id[in]": batch.join(","),
        "select": ["sys", "fields.title", "fields.row"],
      });

      for (const entry of response.items as unknown as ProjectRowEntry[]) {
        projectRowsMap.set(entry.sys.id, entry);
      }
    }

    return projectRowsMap;
  }

  // Step 3: Collect all panel IDs and fetch them in batches
  async function getPanelsByIds(panelIds: string[]): Promise<Map<string, PanelEntry>> {
    console.log(`Step 3: Fetching ${panelIds.length} panels...`);
    const panelsMap = new Map<string, PanelEntry>();

    if (panelIds.length === 0) {
      return panelsMap;
    }

    // Fetch in batches
    for (let i = 0; i < panelIds.length; i += BATCH_SIZE_IDS) {
      const batch = panelIds.slice(i, i + BATCH_SIZE_IDS);
      const batchNum = Math.floor(i / BATCH_SIZE_IDS) + 1;
      const totalBatches = Math.ceil(panelIds.length / BATCH_SIZE_IDS);
      console.log(`  Fetching batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);

      // Fetch without content_type to get mixed types
      // Note: Can't use select with mixed content types, so we fetch all fields
      const response = await client.getEntries({
        "sys.id[in]": batch.join(","),
      });

      for (const entry of response.items as unknown as PanelEntry[]) {
        panelsMap.set(entry.sys.id, entry);
      }
    }

    return panelsMap;
  }

  // Step 4: Compute per-project data
  function computeProjectData(
    projects: ProjectEntry[],
    projectRowsMap: Map<string, ProjectRowEntry>,
    panelsMap: Map<string, PanelEntry>,
  ): ProjectData[] {
    console.log("Step 4: Computing per-project counts...");
    const projectDataList: ProjectData[] = [];

    for (const project of projects) {
      const projectRowsIds = project.fields.projectRows?.map(link => link.sys.id) ?? [];
      const projectRows: ProjectRowEntry[] = [];

      // Collect all panel IDs from projectRows
      const panelIds = new Set<string>();
      for (const projectRowId of projectRowsIds) {
        const projectRow = projectRowsMap.get(projectRowId);
        if (projectRow) {
          projectRows.push(projectRow);
          const rowPanelIds = projectRow.fields.row?.map(link => link.sys.id) ?? [];
          rowPanelIds.forEach(id => panelIds.add(id));
        }
      }

      // Get panels for this project
      const panels: PanelEntry[] = Array.from(panelIds)
        .map(id => panelsMap.get(id))
        .filter((p): p is PanelEntry => p !== undefined);

      // Count assets (images + videos)
      let assetsCount = 0;
      for (const panel of panels) {
        const contentType = panel.sys.contentType?.sys.id;
        if (contentType === "imagesPanel") {
          const fields = panel.fields as ImagesPanelFields;
          assetsCount += fields.images?.length ?? 0;
        }
        else if (contentType === "videosPanel") {
          const fields = panel.fields as VideosPanelFields;
          assetsCount += fields.videos?.length ?? 0;
        }
      }

      projectDataList.push({
        project,
        projectRows,
        panels,
        projectRowsCount: projectRows.length,
        panelsCount: panels.length,
        assetsCount,
      });
    }

    return projectDataList;
  }

  // Step 5: Format and display results
  function formatProjectDetails(projectDataList: ProjectData[]) {
    console.log(`\n${"=".repeat(100)}`);
    console.log("PROJECTS SUMMARY".padStart(52));
    console.log("=".repeat(100));

    // Table header
    console.log(
      `\n${
        "Project".padEnd(50)
      }${"Rows".padStart(8)
      }${"Panels".padStart(10)
      }${"Assets".padStart(10)
      }\n${
        "-".repeat(100)}`,
    );

    let totalProjects = 0;
    let totalProjectRows = 0;
    let totalPanels = 0;
    let totalImages = 0;
    let totalVideos = 0;
    let totalTextPages = 0;
    let totalTextPanels = 0;

    let maxProjectRowsPerProject = 0;
    let maxPanelsPerProjectRow = 0;

    for (const { project, projectRows, panels, projectRowsCount, panelsCount, assetsCount } of projectDataList) {
      totalProjects++;
      const projectTitle = project.fields.title || "NO TITLE";
      const displayName = projectTitle.length > 47 ? `${projectTitle.substring(0, 44)}...` : projectTitle;
      totalProjectRows += projectRowsCount;

      // Track max rows per project
      if (projectRowsCount > maxProjectRowsPerProject) {
        maxProjectRowsPerProject = projectRowsCount;
      }

      // Count panel types and track max panels per row
      for (const projectRow of projectRows) {
        const rowPanelIds = projectRow.fields.row?.map(link => link.sys.id) ?? [];
        const rowPanels = panels.filter(p => rowPanelIds.includes(p.sys.id));
        const rowPanelsCount = rowPanels.length;
        totalPanels += rowPanelsCount;

        if (rowPanelsCount > maxPanelsPerProjectRow) {
          maxPanelsPerProjectRow = rowPanelsCount;
        }

        // Count assets and panel types
        for (const panel of rowPanels) {
          const contentType = panel.sys.contentType?.sys.id;
          if (contentType === "imagesPanel") {
            const fields = panel.fields as ImagesPanelFields;
            totalImages += fields.images?.length ?? 0;
          }
          else if (contentType === "videosPanel") {
            const fields = panel.fields as VideosPanelFields;
            totalVideos += fields.videos?.length ?? 0;
          }
          else if (contentType === "textPage") {
            totalTextPages++;
          }
          else if (contentType === "textPanel") {
            totalTextPanels++;
          }
        }
      }

      console.log(
        displayName.padEnd(50)
        + projectRowsCount.toString().padStart(8)
        + panelsCount.toString().padStart(10)
        + assetsCount.toString().padStart(10),
      );
    }

    // Totals
    console.log("-".repeat(100));
    console.log(
      "TOTALS".padEnd(50)
      + totalProjectRows.toString().padStart(8)
      + totalPanels.toString().padStart(10)
      + (totalImages + totalVideos).toString().padStart(10),
    );

    // Summary
    console.log(`\n${"=".repeat(100)}`);
    console.log("SUMMARY".padStart(52));
    console.log("=".repeat(100));
    console.log(`Total Projects:        ${totalProjects}`);
    console.log(`Total Project Rows:    ${totalProjectRows}`);
    console.log(`Total Panels:          ${totalPanels}`);
    console.log(`  ImagesPanels:       ${totalImages} images`);
    console.log(`  VideosPanels:       ${totalVideos} videos`);
    console.log(`  TextPages:          ${totalTextPages}`);
    console.log(`  TextPanels:         ${totalTextPanels}`);
    console.log(`Total Assets:         ${totalImages + totalVideos}`);

    // Data insights
    console.log(`\n${"=".repeat(100)}`);
    console.log("SITEMAP OPTIMIZATION INSIGHTS".padStart(64));
    console.log("=".repeat(100));
    console.log(`Max ProjectRows per Project:  ${maxProjectRowsPerProject}`);
    console.log(`Max Panels per ProjectRow:    ${maxPanelsPerProjectRow}`);

    const recommendedProjectRowsLimit = Math.max(10, Math.ceil(maxProjectRowsPerProject * 1.5));
    const recommendedPanelsLimit = Math.max(20, Math.ceil(maxPanelsPerProjectRow * 1.5));
    // Contentful GraphQL complexity is additive across levels:
    // projects + (projects*projectRows) + (projects*projectRows*panels) (+ assets if you fetch them)
    // For the common "fetch 1 project at a time" pattern:
    // 1 + projectRowsLimit + (projectRowsLimit*panelsLimit)
    const complexityEstimate
      = 1
        + recommendedProjectRowsLimit
        + (recommendedProjectRowsLimit * recommendedPanelsLimit);
    const maxProjectsPerRequest = Math.floor(11000 / complexityEstimate);

    console.log(`\nRecommended GraphQL limits:`);
    console.log(`  projectRowsCollection: ${recommendedProjectRowsLimit}`);
    console.log(`  rowCollection:         ${recommendedPanelsLimit}`);
    console.log(`  Complexity estimate:   ${complexityEstimate} per project (if fetching 1 project per request)`);
    console.log(`  Max projects/request:  ${maxProjectsPerRequest} (if fetching multiple projects per request)`);
    if (complexityEstimate < 11000) {
      console.log(`  Status:               SAFE (under limit of 11,000)`);
    }
    else {
      console.log(`  Status:               WARNING (exceeds limit of 11,000)`);
    }
    console.log(`${"=".repeat(100)}\n`);
  }

  try {
    console.log("Fetching all projects from Contentful (REST API)...\n");

    // Step 1: Get all projects
    const projects = await getAllProjects();

    if (projects.length === 0) {
      console.log("No projects found.");
      return;
    }

    // Collect all projectRow IDs
    const allProjectRowIds = new Set<string>();
    for (const project of projects) {
      const projectRowIds = project.fields.projectRows?.map(link => link.sys.id) ?? [];
      projectRowIds.forEach(id => allProjectRowIds.add(id));
    }

    // Step 2: Fetch all projectRows
    const projectRowsMap = await getProjectRowsByIds(Array.from(allProjectRowIds));

    // Collect all panel IDs
    const allPanelIds = new Set<string>();
    for (const projectRow of projectRowsMap.values()) {
      const panelIds = projectRow.fields.row?.map(link => link.sys.id) ?? [];
      panelIds.forEach(id => allPanelIds.add(id));
    }

    // Step 3: Fetch all panels
    const panelsMap = await getPanelsByIds(Array.from(allPanelIds));

    // Step 4: Compute per-project data
    const projectDataList = computeProjectData(projects, projectRowsMap, panelsMap);

    // Step 5: Display
    formatProjectDetails(projectDataList);
  }
  catch (error) {
    console.error("Error fetching projects:", error);
    process.exit(1);
  }
}

main();
