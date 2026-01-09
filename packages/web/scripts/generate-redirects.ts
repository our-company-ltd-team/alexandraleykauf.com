#!/usr/bin/env node
/**
 * Script to generate Next.js redirect rules from legacy URL patterns.
 *
 * Maps legacy ASP.NET routes (/p/, /i/, /v/, /t/) to new Next.js routes
 * using Contentful oldSlug fields and XML structure.
 *
 * Usage: pnpm generate-redirects [--format=ts|json] [--out=path] [--xml-path=path] [--preview]
 */

/* eslint-disable no-console */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createContentfulRestClient } from "./contentful-rest-client.js";

// Load environment variables FIRST, before any other imports
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

// =============================================================================
// Types
// =============================================================================

type NextRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

type LegacyXmlProject = {
  uid: string;
  paragraphs: LegacyXmlParagraph[];
};

type LegacyXmlParagraph = {
  imagesSeriesUids: string[];
  videosSeriesUids: string[];
  textPageUids: string[];
};

type ContentfulProject = {
  sys: { id: string };
  fields: {
    slug?: string;
    oldSlug?: string;
    projectRows?: Array<{ sys: { id: string } }>;
  };
};

type ContentfulProjectRow = {
  sys: { id: string };
  fields: {
    row?: Array<{ sys: { id: string } }>;
  };
};

type ContentfulPanel = {
  sys: {
    id: string;
    contentType?: { sys: { id: string } };
  };
  fields: {
    slug?: string;
    oldSlug?: string;
  };
};

// =============================================================================
// XML Parser for Legacy Structure
// =============================================================================

/**
 * Parses legacy XML to extract project UIDs and series UIDs per paragraph.
 * Returns a map: projectUID -> paragraphs with series UIDs.
 */
function parseLegacyXml(xmlContent: string): Map<string, LegacyXmlProject> {
  const projects = new Map<string, LegacyXmlProject>();

  // Parse projects (items)
  const itemRegex = /<item\s+title="[^"]*"\s+UID="([^"]*)"[^>]*>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null = itemRegex.exec(xmlContent);

  while (match !== null) {
    const projectUid = match[1];
    const projectContent = match[2] || "";
    const paragraphs = parseParagraphs(projectContent);

    projects.set(projectUid, {
      uid: projectUid,
      paragraphs,
    });

    match = itemRegex.exec(xmlContent);
  }

  // Also parse self-closing items (CV items)
  const itemNoContentRegex = /<item\s+title="[^"]*"\s+UID="([^"]*)"[^>]*\/>/g;
  match = itemNoContentRegex.exec(xmlContent);

  while (match !== null) {
    const projectUid = match[1];
    if (!projects.has(projectUid)) {
      projects.set(projectUid, {
        uid: projectUid,
        paragraphs: [],
      });
    }
    match = itemNoContentRegex.exec(xmlContent);
  }

  return projects;
}

function parseParagraphs(content: string): LegacyXmlParagraph[] {
  const paragraphs: LegacyXmlParagraph[] = [];
  const paragraphRegex = /<paragraph\s+title="[^"]*"\s+UID="[^"]*"[^>]*>([\s\S]*?)<\/paragraph>/g;
  let match: RegExpExecArray | null = paragraphRegex.exec(content);

  while (match !== null) {
    const paragraphContent = match[1];
    paragraphs.push({
      imagesSeriesUids: parseImagesSeries(paragraphContent),
      videosSeriesUids: parseVideosSeries(paragraphContent),
      textPageUids: parseTextPageUids(paragraphContent),
    });
    match = paragraphRegex.exec(content);
  }

  return paragraphs;
}

function parseImagesSeries(content: string): string[] {
  const uids: string[] = [];
  // Match <images UID="...">...</images>
  const imagesRegex = /<images\s+UID="([^"]*)"[^>]*>/g;
  let match: RegExpExecArray | null = imagesRegex.exec(content);

  while (match !== null) {
    uids.push(match[1]);
    match = imagesRegex.exec(content);
  }

  return uids;
}

function parseVideosSeries(content: string): string[] {
  const uids: string[] = [];
  // Match <videos UID="...">...</videos>
  const videosRegex = /<videos\s+UID="([^"]*)"[^>]*>/g;
  let match: RegExpExecArray | null = videosRegex.exec(content);

  while (match !== null) {
    uids.push(match[1]);
    match = videosRegex.exec(content);
  }

  return uids;
}

function parseTextPageUids(content: string): string[] {
  const uids: string[] = [];
  // Match <textpage title="..." UID="...">...</textpage>
  const textPageRegex = /<textpage\s+title="[^"]*"\s+UID="([^"]*)"[^>]*>/g;
  let match: RegExpExecArray | null = textPageRegex.exec(content);

  while (match !== null) {
    uids.push(match[1]);
    match = textPageRegex.exec(content);
  }

  return uids;
}

// =============================================================================
// Contentful Data Fetching
// =============================================================================

async function fetchAllProjects(
  client: Awaited<ReturnType<typeof createContentfulRestClient>>,
): Promise<ContentfulProject[]> {
  console.log("Fetching all projects from Contentful...");
  const allProjects: ContentfulProject[] = [];
  let skip = 0;
  const limit = 1000;

  while (true) {
    const response = await client.getEntries<ContentfulProject["fields"]>({
      content_type: "project",
      skip,
      limit,
      select: ["sys", "fields.slug", "fields.oldSlug", "fields.projectRows"],
    });

    const projects = response.items as unknown as ContentfulProject[];
    allProjects.push(...projects);

    if (projects.length < limit || skip + limit >= response.total) {
      break;
    }
    skip += limit;
  }

  console.log(`Found ${allProjects.length} projects`);
  return allProjects;
}

async function fetchProjectRowsByIds(
  client: Awaited<ReturnType<typeof createContentfulRestClient>>,
  projectRowIds: string[],
): Promise<Map<string, ContentfulProjectRow>> {
  if (projectRowIds.length === 0) {
    return new Map();
  }

  console.log(`Fetching ${projectRowIds.length} project rows...`);
  const projectRowsMap = new Map<string, ContentfulProjectRow>();
  const BATCH_SIZE = 50;

  for (let i = 0; i < projectRowIds.length; i += BATCH_SIZE) {
    const batch = projectRowIds.slice(i, i + BATCH_SIZE);
    const response = await client.getEntries<ContentfulProjectRow["fields"]>({
      "content_type": "projectRow",
      "sys.id[in]": batch.join(","),
      "select": ["sys", "fields.row"],
    });

    for (const entry of response.items as unknown as ContentfulProjectRow[]) {
      projectRowsMap.set(entry.sys.id, entry);
    }
  }

  return projectRowsMap;
}

async function fetchPanelsByIds(
  client: Awaited<ReturnType<typeof createContentfulRestClient>>,
  panelIds: string[],
): Promise<Map<string, ContentfulPanel>> {
  if (panelIds.length === 0) {
    return new Map();
  }

  console.log(`Fetching ${panelIds.length} panels...`);
  const panelsMap = new Map<string, ContentfulPanel>();
  const BATCH_SIZE = 50;

  for (let i = 0; i < panelIds.length; i += BATCH_SIZE) {
    const batch = panelIds.slice(i, i + BATCH_SIZE);
    const response = await client.getEntries({
      "sys.id[in]": batch.join(","),
    });

    for (const entry of response.items as unknown as ContentfulPanel[]) {
      panelsMap.set(entry.sys.id, entry);
    }
  }

  return panelsMap;
}

// =============================================================================
// Redirect Generation
// =============================================================================

function generateRedirects(
  legacyProjects: Map<string, LegacyXmlProject>,
  contentfulProjects: ContentfulProject[],
  projectRowsMap: Map<string, ContentfulProjectRow>,
  panelsMap: Map<string, ContentfulPanel>,
): NextRedirect[] {
  console.log("Generating redirects...");
  const redirects: NextRedirect[] = [];
  const sourceToDest = new Map<string, string>();

  // Build map: oldSlug -> ContentfulProject
  const projectsByOldSlug = new Map<string, ContentfulProject>();
  for (const project of contentfulProjects) {
    const oldSlug = project.fields.oldSlug;
    if (oldSlug) {
      projectsByOldSlug.set(oldSlug, project);
    }
  }

  // Process each legacy project
  for (const [legacyProjectUid, legacyProject] of legacyProjects) {
    const contentfulProject = projectsByOldSlug.get(legacyProjectUid);
    if (!contentfulProject || !contentfulProject.fields.slug) {
      console.warn(`  Skipping legacy project ${legacyProjectUid} - not found in Contentful or missing slug`);
      continue;
    }

    const newProjectSlug = contentfulProject.fields.slug;

    // Generate project redirect: /p/{oldUid} -> /{newSlug}
    const projectSource = `/p/${legacyProjectUid}`;
    const projectDest = `/${newProjectSlug}`;
    sourceToDest.set(projectSource, projectDest);

    // Process paragraphs (aligned with projectRows)
    const projectRowIds = contentfulProject.fields.projectRows?.map(link => link.sys.id) ?? [];
    const projectRows = projectRowIds
      .map(id => projectRowsMap.get(id))
      .filter((row): row is ContentfulProjectRow => row !== undefined);

    // Match legacy paragraphs with Contentful projectRows by order
    for (let i = 0; i < Math.max(legacyProject.paragraphs.length, projectRows.length); i++) {
      const legacyParagraph = legacyProject.paragraphs[i];
      const projectRow = projectRows[i];

      if (!legacyParagraph || !projectRow) {
        continue;
      }

      const panelIds = projectRow.fields.row?.map(link => link.sys.id) ?? [];
      const panels = panelIds
        .map(id => panelsMap.get(id))
        .filter((panel): panel is ContentfulPanel => panel !== undefined);

      // Map images series UIDs to imagesPanels (by order)
      const imagesPanels = panels.filter(p => p.sys.contentType?.sys.id === "imagesPanel");
      if (legacyParagraph.imagesSeriesUids.length > imagesPanels.length) {
        console.warn(
          `  Warning: Project ${legacyProjectUid} paragraph ${i} has ${legacyParagraph.imagesSeriesUids.length} images series but only ${imagesPanels.length} imagesPanels`,
        );
      }
      for (let seriesIndex = 0; seriesIndex < legacyParagraph.imagesSeriesUids.length; seriesIndex++) {
        const imagesSeriesUid = legacyParagraph.imagesSeriesUids[seriesIndex];
        const imagesPanel = imagesPanels[seriesIndex];
        if (imagesPanel && imagesPanel.fields.slug) {
          const source = `/i/${legacyProjectUid}/${imagesSeriesUid}/:index(\\d+)`;
          const dest = `/${newProjectSlug}/${imagesPanel.fields.slug}/:index`;
          sourceToDest.set(source, dest);
        }
        else if (imagesSeriesUid) {
          console.warn(
            `  Warning: Could not map images series ${imagesSeriesUid} for project ${legacyProjectUid} paragraph ${i}`,
          );
        }
      }

      // Map videos series UIDs to videosPanels (by order)
      const videosPanels = panels.filter(p => p.sys.contentType?.sys.id === "videosPanel");
      if (legacyParagraph.videosSeriesUids.length > videosPanels.length) {
        console.warn(
          `  Warning: Project ${legacyProjectUid} paragraph ${i} has ${legacyParagraph.videosSeriesUids.length} videos series but only ${videosPanels.length} videosPanels`,
        );
      }
      for (let seriesIndex = 0; seriesIndex < legacyParagraph.videosSeriesUids.length; seriesIndex++) {
        const videosSeriesUid = legacyParagraph.videosSeriesUids[seriesIndex];
        const videosPanel = videosPanels[seriesIndex];
        if (videosPanel && videosPanel.fields.slug) {
          const source = `/v/${legacyProjectUid}/${videosSeriesUid}/:index(\\d+)`;
          const dest = `/${newProjectSlug}/${videosPanel.fields.slug}/:index`;
          sourceToDest.set(source, dest);
        }
        else if (videosSeriesUid) {
          console.warn(
            `  Warning: Could not map videos series ${videosSeriesUid} for project ${legacyProjectUid} paragraph ${i}`,
          );
        }
      }

      // Map textPage UIDs to textPages (by oldSlug match)
      for (const textPageUid of legacyParagraph.textPageUids) {
        const textPage = panels.find(
          p => p.sys.contentType?.sys.id === "textPage" && p.fields.oldSlug === textPageUid,
        );
        if (textPage && textPage.fields.slug) {
          const source = `/t/${legacyProjectUid}/${textPageUid}`;
          const dest = `/${newProjectSlug}/${textPage.fields.slug}`;
          sourceToDest.set(source, dest);
        }
      }
    }
  }

  // Check for collisions (same source mapping to different destinations)
  const sourceToDestinations = new Map<string, Set<string>>();
  for (const [source, dest] of sourceToDest.entries()) {
    if (!sourceToDestinations.has(source)) {
      sourceToDestinations.set(source, new Set());
    }
    sourceToDestinations.get(source)!.add(dest);
  }

  const duplicateSources = Array.from(sourceToDestinations.entries())
    .filter(([, dests]) => dests.size > 1)
    .map(([source]) => source);

  if (duplicateSources.length > 0) {
    console.error("ERROR: Found duplicate redirect sources:");
    for (const source of duplicateSources) {
      const dests = Array.from(sourceToDestinations.get(source)!);
      console.error(`  ${source} -> ${dests.join(", ")}`);
    }
    process.exit(1);
  }

  // Convert to Next.js redirect format
  for (const [source, destination] of sourceToDest.entries()) {
    redirects.push({
      source,
      destination,
      permanent: true,
    });
  }

  // Sort by source for stable output
  redirects.sort((a, b) => a.source.localeCompare(b.source));

  return redirects;
}

// =============================================================================
// Output Formatting
// =============================================================================

function formatAsJson(redirects: NextRedirect[]): string {
  return JSON.stringify(redirects, null, 2);
}

function formatAsTypeScript(redirects: NextRedirect[]): string {
  const lines = redirects.map((r) => {
    const source = JSON.stringify(r.source);
    const destination = JSON.stringify(r.destination);
    return `  { source: ${source}, destination: ${destination}, permanent: ${r.permanent} }`;
  });

  return `export const redirects = [\n${lines.join(",\n")}\n];\n`;
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const format = args.find(arg => arg.startsWith("--format="))?.split("=")[1] || "json";
  const outPath = args.find(arg => arg.startsWith("--out="))?.split("=")[1];
  const xmlPathArg = args.find(arg => arg.startsWith("--xml-path="))?.split("=")[1];
  const usePreview = args.includes("--preview");

  // Determine XML path
  const defaultXmlPath = resolve(
    workspaceRoot,
    "packages/contentful-migrations/old-site-data/info.xml",
  );
  const xmlPath = xmlPathArg
    ? resolve(xmlPathArg)
    : defaultXmlPath;

  console.log(`Reading legacy XML from: ${xmlPath}`);
  const xmlContent = readFileSync(xmlPath, "utf-8");
  const legacyProjects = parseLegacyXml(xmlContent);
  console.log(`Parsed ${legacyProjects.size} legacy projects from XML`);

  const client = await createContentfulRestClient({ preview: usePreview });
  const contentfulProjects = await fetchAllProjects(client);

  // Collect all projectRow IDs
  const allProjectRowIds = new Set<string>();
  for (const project of contentfulProjects) {
    const projectRowIds = project.fields.projectRows?.map(link => link.sys.id) ?? [];
    projectRowIds.forEach(id => allProjectRowIds.add(id));
  }

  const projectRowsMap = await fetchProjectRowsByIds(client, Array.from(allProjectRowIds));

  // Collect all panel IDs
  const allPanelIds = new Set<string>();
  for (const projectRow of projectRowsMap.values()) {
    const panelIds = projectRow.fields.row?.map(link => link.sys.id) ?? [];
    panelIds.forEach(id => allPanelIds.add(id));
  }

  const panelsMap = await fetchPanelsByIds(client, Array.from(allPanelIds));

  const redirects = generateRedirects(
    legacyProjects,
    contentfulProjects,
    projectRowsMap,
    panelsMap,
  );

  console.log(`\nGenerated ${redirects.length} redirect rules`);

  // Format output
  let output: string;
  if (format === "ts" || format === "next") {
    output = formatAsTypeScript(redirects);
  }
  else {
    output = formatAsJson(redirects);
  }

  // Write to file or stdout
  if (outPath) {
    const fs = await import("node:fs/promises");
    await fs.writeFile(resolve(outPath), output, "utf-8");
    console.log(`\nRedirects written to: ${outPath}`);
  }
  else {
    console.log(`\n${output}`);
  }
}

main().catch((error) => {
  console.error("Error generating redirects:", error);
  process.exit(1);
});
