/**
 * One-Off Data Migration: import-xml-data
 * Created: 2025-12-02
 *
 * Imports data from info.xml into Contentful including:
 * - Categories, Links, Separators
 * - Projects with images, videos, text panels, and text pages
 * - Asset uploads for images and video previews
 *
 * Run with: pnpm migrate:one-off --name import-xml-data
 */

import type { Asset, Entry, Environment } from "contentful-management";

import contentful from "contentful-management";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { logger } from "../src/utils/logger.js";

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// =============================================================================
// Configuration
// =============================================================================

const BASE_IMAGE_URL = "https://www.alexandraleykauf.com";
const LOCALE = "en-US";

// Rate limiting to avoid API limits
// Contentful free tier: ~7 requests/second, paid: ~10 requests/second
const DELAY_BETWEEN_REQUESTS = 300; // ms between sequential operations
const DELAY_BETWEEN_ASSETS = 800; // ms for asset processing (heavier operations)
const BATCH_CONCURRENCY = 3; // Reduced from 5 to stay under rate limits

// =============================================================================
// CLI Arguments
// =============================================================================

const args = globalThis.process.argv.slice(2);
const projectUidArg = args.find(a => a.startsWith("--project-uid="));
const targetProjectUid = projectUidArg?.split("=")[1];

// =============================================================================
// Types
// =============================================================================

type XmlCategory = {
  title: string;
  uid: string;
  startpage: boolean;
  color: string;
};

type XmlLink = {
  title: string;
  uid: string;
  category: string;
  type: string;
  url: string;
  place: string;
};

type XmlSeparator = {
  category: string;
};

type XmlImage = {
  title: string;
  src: string;
  subtitle: string;
  format: string;
  legend: string;
};

type XmlVideo = {
  title: string;
  src: string;
  videoId: string;
  videoType: string;
  autostart: boolean;
  legend: string;
};

type XmlTextPage = {
  title: string;
  uid: string;
  text: string;
};

type XmlSimpleText = {
  text: string;
};

type XmlParagraph = {
  title: string;
  uid: string;
  images: XmlImage[];
  videos: XmlVideo[];
  textPages: XmlTextPage[];
  simpleTexts: XmlSimpleText[];
};

type XmlProject = {
  title: string;
  uid: string;
  year: string;
  category: string;
  place: string;
  paragraphs: XmlParagraph[];
};

type ParsedXmlData = {
  categories: XmlCategory[];
  links: XmlLink[];
  separators: XmlSeparator[];
  projects: XmlProject[];
};

type EntryReference = {
  sys: {
    type: "Link";
    linkType: "Entry";
    id: string;
  };
};

type AssetReference = {
  sys: {
    type: "Link";
    linkType: "Asset";
    id: string;
  };
};

type UploadResult = {
  image: XmlImage;
  result: { assetId: string; url: string } | null;
  index: number;
};

type SuccessfulUpload = {
  image: XmlImage;
  result: { assetId: string; url: string };
  index: number;
};

function isSuccessfulUpload(upload: UploadResult): upload is SuccessfulUpload {
  return upload.result !== null;
}

// =============================================================================
// Utility Functions
// =============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process items in parallel with concurrency limit and error isolation
 */
async function processInBatches<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  concurrency: number = BATCH_CONCURRENCY,
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map((item, batchIndex) => processor(item, i + batchIndex)),
    );

    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      }
      else {
        logger.error(`  Batch item failed: ${formatError(result.reason)}`);
      }
    }

    // Delay between batches to avoid rate limiting
    if (i + concurrency < items.length) {
      await delay(DELAY_BETWEEN_REQUESTS);
    }
  }

  return results;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/gi, "ae")
    .replace(/ö/gi, "oe")
    .replace(/ü/gi, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

function createEntryRef(entryId: string): EntryReference {
  return {
    sys: {
      type: "Link",
      linkType: "Entry",
      id: entryId,
    },
  };
}

function createAssetRef(assetId: string): AssetReference {
  return {
    sys: {
      type: "Link",
      linkType: "Asset",
      id: assetId,
    },
  };
}

function localizedField<T>(value: T): { [LOCALE]: T } {
  return { [LOCALE]: value };
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Convert year string to ISO date format (YYYY-MM-DD)
 * Tracks occurrences of each year to assign different days for projects with the same year
 * Handles year ranges (e.g., "2003-2004") by using the start year
 */
function yearToDate(yearStr: string, yearDayCounter: Map<string, number>): string {
  // Handle year ranges like "2003-2004" - use start year
  const year = yearStr.split("-")[0].trim();

  // Get and increment the day counter for this year
  const dayCount = (yearDayCounter.get(year) || 0) + 1;
  yearDayCounter.set(year, dayCount);

  // Format as ISO date: YYYY-MM-DD
  // Using January as the month, with incrementing days
  const day = String(dayCount).padStart(2, "0");
  return `${year}-01-${day}`;
}

const MAX_SYMBOL_LENGTH = 255;

function truncateSymbol(text: string | undefined): string | undefined {
  if (!text)
    return undefined;
  if (text.length <= MAX_SYMBOL_LENGTH)
    return text;
  return `${text.substring(0, MAX_SYMBOL_LENGTH - 3)}...`;
}

// =============================================================================
// XML Parser
// =============================================================================

function parseXml(xmlContent: string): ParsedXmlData {
  // Simple regex-based XML parser for this specific structure
  const categories: XmlCategory[] = [];
  const links: XmlLink[] = [];
  const separators: XmlSeparator[] = [];
  const projects: XmlProject[] = [];

  // Parse categories
  const categoryRegex = /<category\s+title="([^"]*)"\s+UID="([^"]*)"\s+startpage="([^"]*)"\s+color="([^"]*)"[^>]*><\/category>/g;
  let match: RegExpExecArray | null = categoryRegex.exec(xmlContent);

  while (match !== null) {
    categories.push({
      title: match[1],
      uid: match[2],
      startpage: match[3] === "true",
      color: match[4],
    });
    match = categoryRegex.exec(xmlContent);
  }

  // Parse links
  const linkRegex = /<link\s+title="([^"]*)"\s+UID="([^"]*)"\s+category="([^"]*)"\s+type="([^"]*)"\s+url="([^"]*)"\s+file="[^"]*"\s+place="([^"]*)"[^>]*><\/link>/g;
  match = linkRegex.exec(xmlContent);

  while (match !== null) {
    links.push({
      title: match[1],
      uid: match[2],
      category: match[3],
      type: match[4],
      url: match[5],
      place: match[6],
    });
    match = linkRegex.exec(xmlContent);
  }

  // Parse separators
  const separatorRegex = /<separator\s+category="([^"]*)"[^>]*><\/separator>/g;
  match = separatorRegex.exec(xmlContent);

  while (match !== null) {
    separators.push({
      category: match[1],
    });
    match = separatorRegex.exec(xmlContent);
  }

  // Parse projects (items)
  const itemRegex = /<item\s+title="([^"]*)"\s+UID="([^"]*)"\s+year="([^"]*)"\s+category="([^"]*)"(?:\s+place="([^"]*)")?[^>]*>([\s\S]*?)<\/item>/g;
  match = itemRegex.exec(xmlContent);

  while (match !== null) {
    const projectContent = match[6] || "";
    const paragraphs = parseParagraphs(projectContent);

    projects.push({
      title: decodeHtmlEntities(match[1]),
      uid: match[2],
      year: match[3],
      category: match[4],
      place: match[5] || "",
      paragraphs,
    });
    match = itemRegex.exec(xmlContent);
  }

  // Also parse items without content (CV items that are self-closing or empty)
  const itemNoContentRegex = /<item\s+title="([^"]*)"\s+UID="([^"]*)"\s+year="([^"]*)"\s+category="([^"]*)"[^>]*\/>/g;
  match = itemNoContentRegex.exec(xmlContent);

  while (match !== null) {
    // Check if not already added
    const uid = match[2];
    if (!projects.some(p => p.uid === uid)) {
      projects.push({
        title: decodeHtmlEntities(match[1]),
        uid: match[2],
        year: match[3],
        category: match[4],
        place: "",
        paragraphs: [],
      });
    }
    match = itemNoContentRegex.exec(xmlContent);
  }

  return { categories, links, separators, projects };
}

function parseParagraphs(content: string): XmlParagraph[] {
  const paragraphs: XmlParagraph[] = [];
  const paragraphRegex = /<paragraph\s+title="([^"]*)"\s+UID="([^"]*)"[^>]*>([\s\S]*?)<\/paragraph>/g;
  let match: RegExpExecArray | null = paragraphRegex.exec(content);

  while (match !== null) {
    const paragraphContent = match[3];

    paragraphs.push({
      title: match[1],
      uid: match[2],
      images: parseImages(paragraphContent),
      videos: parseVideos(paragraphContent),
      textPages: parseTextPages(paragraphContent),
      simpleTexts: parseSimpleTexts(paragraphContent),
    });
    match = paragraphRegex.exec(content);
  }

  return paragraphs;
}

function parseImages(content: string): XmlImage[] {
  const images: XmlImage[] = [];
  // Match both self-closing and regular image tags
  const imageRegex = /<image\s+title="([^"]*)"\s+src="([^"]*)"(?:\s+subtitle="([^"]*)")?(?:\s+format="([^"]*)")?[^>]*>(?:<legend>([^<]*)<\/legend>)?(?:<\/image>)?/g;
  let match: RegExpExecArray | null = imageRegex.exec(content);

  while (match !== null) {
    images.push({
      title: decodeHtmlEntities(match[1] || ""),
      src: match[2],
      subtitle: match[3] || "",
      format: match[4] || "",
      legend: match[5] || "",
    });
    match = imageRegex.exec(content);
  }

  return images;
}

function parseVideos(content: string): XmlVideo[] {
  const videos: XmlVideo[] = [];
  const videoRegex = /<video\s+title="([^"]*)"\s+src="([^"]*)"\s+video="([^"]*)"\s+autostart="([^"]*)"[^>]*>(?:<legend>([^<]*)<\/legend>)?(?:<\/video>)?/g;
  let match: RegExpExecArray | null = videoRegex.exec(content);

  while (match !== null) {
    const videoAttr = match[3];
    const [videoType, videoId] = videoAttr.split(",");

    videos.push({
      title: decodeHtmlEntities(match[1] || ""),
      src: match[2],
      videoType: videoType || "vimeo",
      videoId: videoId || "",
      autostart: match[4] === "true",
      legend: match[5] || "",
    });
    match = videoRegex.exec(content);
  }

  return videos;
}

function parseTextPages(content: string): XmlTextPage[] {
  const textPages: XmlTextPage[] = [];
  const textPageRegex = /<textpage\s+title="([^"]*)"\s+UID="([^"]*)"[^>]*>\s*<text>([\s\S]*?)<\/text>\s*<\/textpage>/g;
  let match: RegExpExecArray | null = textPageRegex.exec(content);

  while (match !== null) {
    textPages.push({
      title: decodeHtmlEntities(match[1]),
      uid: match[2],
      text: match[3],
    });
    match = textPageRegex.exec(content);
  }

  return textPages;
}

function parseSimpleTexts(content: string): XmlSimpleText[] {
  const texts: XmlSimpleText[] = [];
  // Match <texts><text><text>content</text></text></texts> pattern (not textpage)
  const textsBlockRegex = /<texts>([\s\S]*?)<\/texts>/g;
  let textsMatch: RegExpExecArray | null = textsBlockRegex.exec(content);

  while (textsMatch !== null) {
    const textsContent = textsMatch[1];
    // Skip if this block contains textpage elements
    if (textsContent.includes("<textpage")) {
      textsMatch = textsBlockRegex.exec(content);
      continue;
    }

    // Match simple text pattern
    const simpleTextRegex = /<text>\s*<text>([\s\S]*?)<\/text>\s*<\/text>/g;
    let match: RegExpExecArray | null = simpleTextRegex.exec(textsContent);

    while (match !== null) {
      texts.push({
        text: match[1],
      });
      match = simpleTextRegex.exec(textsContent);
    }

    textsMatch = textsBlockRegex.exec(content);
  }

  return texts;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#43;/g, "+")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, "\u00A0")
    .replace(/<br\s*\/?>/gi, "\n");
}

// =============================================================================
// HTML to Rich Text Converter
// =============================================================================

type RichTextNode = {
  nodeType: string;
  content?: RichTextNode[];
  value?: string;
  data?: Record<string, unknown>;
  marks?: Array<{ type: string }>;
};

type RichTextDocument = {
  nodeType: "document";
  data: Record<string, unknown>;
  content: RichTextNode[];
};

function htmlToRichText(html: string): RichTextDocument {
  const document: RichTextDocument = {
    nodeType: "document",
    data: {},
    content: [],
  };

  if (!html || html.trim() === "") {
    // Return empty document with at least one paragraph
    document.content.push({
      nodeType: "paragraph",
      data: {},
      content: [{ nodeType: "text", value: "", marks: [], data: {} }],
    });
    return document;
  }

  // Decode HTML entities first
  const decodedHtml = decodeHtmlEntities(html);

  // Parse HTML content
  const content = parseHtmlContent(decodedHtml);
  document.content = content.length > 0
    ? content
    : [{
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: "", marks: [], data: {} }],
      }];

  return document;
}

function parseHtmlContent(html: string): RichTextNode[] {
  const nodes: RichTextNode[] = [];

  // Split by block-level elements
  const blockPattern = /<(p|h[1-6]|ul|ol|div|blockquote)([^>]*)>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;

  // Process block elements
  const tempHtml = html;
  const blockRegex = new RegExp(blockPattern);
  let match: RegExpExecArray | null = blockRegex.exec(tempHtml);

  while (match !== null) {
    // Handle text before this block (if any)
    const beforeText = tempHtml.substring(lastIndex, match.index).trim();
    if (beforeText) {
      const textNodes = parseInlineContent(beforeText);
      if (textNodes.length > 0) {
        nodes.push({
          nodeType: "paragraph",
          data: {},
          content: textNodes,
        });
      }
    }

    const tagName = match[1].toLowerCase();
    const content = match[3];

    switch (tagName) {
      case "p":
      case "div": {
        const inlineContent = parseInlineContent(content);
        // Skip empty paragraphs (only whitespace/nbsp - old spacing hack)
        // Check if paragraph has any non-whitespace content
        const hasRealContent = inlineContent.some((node) => {
          if (node.nodeType === "text") {
            // Check if text has any non-whitespace characters (including \u00A0)
            return node.value && /\S/.test(node.value);
          }
          // Non-text nodes (like links) are considered real content
          return true;
        });
        if (inlineContent.length > 0 && hasRealContent) {
          nodes.push({
            nodeType: "paragraph",
            data: {},
            content: inlineContent,
          });
        }
        break;
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        const level = Number.parseInt(tagName[1], 10);
        const inlineContent = parseInlineContent(content);
        if (inlineContent.length > 0) {
          nodes.push({
            nodeType: `heading-${level}`,
            data: {},
            content: inlineContent,
          });
        }
        break;
      }
      case "ul": {
        const listItems = parseListItems(content);
        if (listItems.length > 0) {
          nodes.push({
            nodeType: "unordered-list",
            data: {},
            content: listItems,
          });
        }
        break;
      }
      case "ol": {
        const listItems = parseListItems(content);
        if (listItems.length > 0) {
          nodes.push({
            nodeType: "ordered-list",
            data: {},
            content: listItems,
          });
        }
        break;
      }
      case "blockquote": {
        // Convert blockquote to paragraph (blockquote not supported in this schema)
        const inlineContent = parseInlineContent(content);
        if (inlineContent.length > 0) {
          nodes.push({
            nodeType: "paragraph",
            data: {},
            content: inlineContent,
          });
        }
        break;
      }
    }

    lastIndex = match.index + match[0].length;
    match = blockRegex.exec(tempHtml);
  }

  // Handle remaining text after last block
  const remainingText = html.substring(lastIndex).trim();
  if (remainingText) {
    const textNodes = parseInlineContent(remainingText);
    if (textNodes.length > 0) {
      nodes.push({
        nodeType: "paragraph",
        data: {},
        content: textNodes,
      });
    }
  }

  // If no blocks were found, treat entire content as a paragraph
  if (nodes.length === 0 && html.trim()) {
    const textNodes = parseInlineContent(html);
    if (textNodes.length > 0) {
      nodes.push({
        nodeType: "paragraph",
        data: {},
        content: textNodes,
      });
    }
  }

  return nodes;
}

function parseListItems(content: string): RichTextNode[] {
  const items: RichTextNode[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null = liRegex.exec(content);

  while (match !== null) {
    const itemContent = parseInlineContent(match[1]);
    if (itemContent.length > 0) {
      items.push({
        nodeType: "list-item",
        data: {},
        content: [{
          nodeType: "paragraph",
          data: {},
          content: itemContent,
        }],
      });
    }
    match = liRegex.exec(content);
  }

  return items;
}

function parseInlineContent(html: string): RichTextNode[] {
  const nodes: RichTextNode[] = [];

  // Remove nested block elements (will be handled separately)
  let cleanHtml = html.replace(/<\/?(?:p|div|ul|ol|li|h[1-6])[^>]*>/gi, " ");

  // Handle line breaks
  cleanHtml = cleanHtml.replace(/<br\s*\/?>/gi, "\n");

  // Process inline elements
  const segments = splitInlineElements(cleanHtml);

  for (const segment of segments) {
    if (segment.type === "text") {
      // Normalize whitespace (collapse multiple spaces/newlines to single space) but preserve single spaces
      const text = stripTags(segment.content).replace(/\s+/g, " ");
      // Only skip completely empty strings, but preserve single spaces and text with spaces
      if (text && text.length > 0) {
        // If this segment is just whitespace and we have a previous text node, merge it
        if (text === " " && nodes.length > 0) {
          const lastNode = nodes[nodes.length - 1];
          if (lastNode.nodeType === "text" && lastNode.value) {
            // Only append space if the last node doesn't already end with a space
            if (!lastNode.value.endsWith(" ")) {
              lastNode.value += " ";
            }
            continue;
          }
        }
        nodes.push({
          nodeType: "text",
          value: text,
          marks: segment.marks || [],
          data: {},
        });
      }
    }
    else if (segment.type === "link") {
      const linkContent = parseInlineContent(segment.content);
      if (linkContent.length > 0) {
        nodes.push({
          nodeType: "hyperlink",
          data: { uri: segment.href || "" },
          content: linkContent,
        });
      }
    }
  }

  // Ensure at least one text node
  if (nodes.length === 0) {
    nodes.push({
      nodeType: "text",
      value: stripTags(html).trim() || " ",
      marks: [],
      data: {},
    });
  }

  return nodes;
}

type InlineSegment = {
  type: "text" | "link";
  content: string;
  marks?: Array<{ type: string }>;
  href?: string;
};

function splitInlineElements(html: string): InlineSegment[] {
  const segments: InlineSegment[] = [];

  // Pattern for inline elements (HTML tags)
  const inlinePattern = /<(strong|em|sup|sub|[biua])([^>]*)>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null = inlinePattern.exec(html);

  while (match !== null) {
    // Text before this element (preserve whitespace)
    if (match.index > lastIndex) {
      const text = html.substring(lastIndex, match.index);
      // Include segment even if it's just whitespace to preserve spaces around tags
      if (text) {
        segments.push({ type: "text", content: text, marks: [] });
      }
    }

    const tagName = match[1].toLowerCase();
    const attrs = match[2];
    const content = match[3];

    if (tagName === "a") {
      const hrefMatch = /href="([^"]*)"/.exec(attrs);
      segments.push({
        type: "link",
        content,
        href: hrefMatch ? hrefMatch[1] : "",
      });
    }
    else {
      const markType = getMarkType(tagName);
      if (markType) {
        segments.push({
          type: "text",
          content,
          marks: [{ type: markType }],
        });
      }
      else {
        segments.push({ type: "text", content, marks: [] });
      }
    }

    lastIndex = match.index + match[0].length;
    match = inlinePattern.exec(html);
  }

  // Remaining text (preserve whitespace)
  if (lastIndex < html.length) {
    const text = html.substring(lastIndex);
    if (text) {
      segments.push({ type: "text", content: text, marks: [] });
    }
  }

  return segments;
}

function getMarkType(tagName: string): string | null {
  const markMap: Record<string, string> = {
    strong: "bold",
    b: "bold",
    em: "italic",
    i: "italic",
    u: "underline",
    sup: "superscript",
    sub: "subscript",
  };
  return markMap[tagName] || null;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// =============================================================================
// Contentful Client
// =============================================================================

function getEnvVar(name: string): string {
  const value = globalThis.process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

async function getEnvironment(): Promise<Environment> {
  const accessToken = getEnvVar("CONTENTFUL_MANAGEMENT_TOKEN");
  const spaceId = getEnvVar("CONTENTFUL_SPACE_ID");
  const environmentId = globalThis.process.env.CONTENTFUL_ENVIRONMENT || "master";

  const client = contentful.createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  return space.getEnvironment(environmentId);
}

// =============================================================================
// Asset Upload
// =============================================================================

/**
 * Extract filename without extension from a URL or path
 */
function getFilenameWithoutExtension(url: string): string {
  const filename = url.split("/").pop() || "image";
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
}

async function uploadAsset(
  env: Environment,
  imageUrl: string,
  description: string,
): Promise<Asset | null> {
  try {
    const fullUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${BASE_IMAGE_URL}${imageUrl}`;

    // Use filename without extension as asset title
    const assetTitle = getFilenameWithoutExtension(imageUrl);

    logger.info(`  Uploading asset: ${fullUrl}`);

    // Create the asset
    const asset = await env.createAsset({
      fields: {
        title: localizedField(assetTitle),
        description: localizedField(description || ""),
        file: localizedField({
          contentType: "image/jpeg",
          fileName: imageUrl.split("/").pop() || "image.jpg",
          upload: fullUrl,
        }),
      },
    });

    // Process the asset
    await asset.processForAllLocales();

    // Wait for processing
    await delay(DELAY_BETWEEN_ASSETS);

    // Fetch the updated asset and publish
    const processedAsset = await env.getAsset(asset.sys.id);

    // Check if asset is ready to publish
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      try {
        const currentAsset = await env.getAsset(asset.sys.id);
        if (currentAsset.fields.file?.[LOCALE]?.url) {
          await currentAsset.publish();
          logger.info(`  Asset published: ${asset.sys.id}`);
          return currentAsset;
        }
      }
      catch {
        // Asset not ready yet
      }
      await delay(1000);
      attempts++;
    }

    logger.warn(`  Asset processing timed out: ${fullUrl}`);
    return processedAsset;
  }
  catch (error) {
    logger.error(`  Failed to upload asset: ${imageUrl} - ${formatError(error)}`);
    return null;
  }
}

/**
 * Upload asset without waiting for full processing - just create and start processing
 */
async function uploadAssetFast(
  env: Environment,
  imageUrl: string,
  description: string,
): Promise<{ assetId: string; url: string } | null> {
  try {
    const fullUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${BASE_IMAGE_URL}${imageUrl}`;

    // Use filename without extension as asset title
    const assetTitle = getFilenameWithoutExtension(imageUrl);

    const asset = await env.createAsset({
      fields: {
        title: localizedField(assetTitle),
        description: localizedField(description || ""),
        file: localizedField({
          contentType: "image/jpeg",
          fileName: imageUrl.split("/").pop() || "image.jpg",
          upload: fullUrl,
        }),
      },
    });

    // Start processing but don't wait - log errors but don't fail
    asset.processForAllLocales().catch((error) => {
      logger.warn(`  Asset processing started with warning (${asset.sys.id}): ${formatError(error)}`);
    });

    logger.info(`  Uploaded asset: ${asset.sys.id}`);
    return { assetId: asset.sys.id, url: fullUrl };
  }
  catch (error) {
    logger.error(`  Failed to upload asset: ${imageUrl} - ${formatError(error)}`);
    return null;
  }
}

/**
 * Wait for multiple assets to be processed and publish them
 */
async function waitAndPublishAssets(
  env: Environment,
  assetIds: string[],
): Promise<Map<string, Asset>> {
  const publishedAssets = new Map<string, Asset>();
  const maxWaitTime = 30000; // 30 seconds total
  const pollInterval = 2000; // Check every 2 seconds
  const startTime = Date.now();

  const pendingIds = new Set(assetIds);

  while (pendingIds.size > 0 && Date.now() - startTime < maxWaitTime) {
    const checkPromises = Array.from(pendingIds).map(async (id) => {
      try {
        const asset = await env.getAsset(id);
        if (asset.fields.file?.[LOCALE]?.url) {
          await asset.publish();
          publishedAssets.set(id, asset);
          pendingIds.delete(id);
          logger.info(`  Asset published: ${id}`);
        }
      }
      catch {
        // Asset not ready yet
      }
    });

    await Promise.all(checkPromises);

    if (pendingIds.size > 0) {
      await delay(pollInterval);
    }
  }

  if (pendingIds.size > 0) {
    logger.warn(`  ${pendingIds.size} assets timed out during processing`);
  }

  return publishedAssets;
}

// =============================================================================
// Entry Creation Functions
// =============================================================================

async function getOrCreateCategories(
  env: Environment,
  categories: XmlCategory[],
): Promise<Map<string, string>> {
  logger.header("Setting up categories...");
  const categoryMap = new Map<string, string>();

  for (const cat of categories) {
    try {
      // Try to find existing category by slug
      const slug = slugify(cat.uid);
      const existingEntries = await env.getEntries({
        "content_type": "category",
        "fields.slug": slug,
        "limit": 1,
      });

      if (existingEntries.items.length > 0) {
        // Category already exists, use existing ID
        const existingId = existingEntries.items[0].sys.id;
        categoryMap.set(cat.uid, existingId);
        logger.info(`  Found existing category: ${cat.title} (${existingId})`);
      }
      else {
        // Create new category
        const entry = await env.createEntry("category", {
          fields: {
            contentfulDescription: localizedField(`Category: ${cat.title}`),
            title: localizedField(cat.title),
            slug: localizedField(slug),
            showOnStartPage: localizedField(cat.startpage),
            color: localizedField(cat.color),
          },
        });

        await entry.publish();
        categoryMap.set(cat.uid, entry.sys.id);
        logger.info(`  Created category: ${cat.title} (${entry.sys.id})`);
      }

      await delay(DELAY_BETWEEN_REQUESTS);
    }
    catch (error) {
      logger.error(`  Failed to setup category: ${cat.title} - ${formatError(error)}`);
    }
  }

  return categoryMap;
}

async function createSeparators(
  env: Environment,
  separators: XmlSeparator[],
  categoryMap: Map<string, string>,
): Promise<void> {
  logger.header("Creating separators...");

  let index = 0;
  for (const sep of separators) {
    const categoryId = categoryMap.get(sep.category);
    if (!categoryId) {
      logger.warn(`  Category not found for separator: ${sep.category}`);
      continue;
    }

    try {
      const entry = await env.createEntry("separator", {
        fields: {
          contentfulDescription: localizedField(`Separator ${++index} (${sep.category})`),
          category: localizedField(createEntryRef(categoryId)),
        },
      });

      await entry.publish();
      logger.info(`  Created separator for category: ${sep.category}`);
      await delay(DELAY_BETWEEN_REQUESTS);
    }
    catch (error) {
      logger.error(`  Failed to create separator - ${formatError(error)}`);
    }
  }
}

async function createLinks(
  env: Environment,
  links: XmlLink[],
  categoryMap: Map<string, string>,
): Promise<void> {
  logger.header("Creating links...");

  for (const link of links) {
    const categoryId = categoryMap.get(link.category);
    if (!categoryId) {
      logger.warn(`  Category not found for link: ${link.title}`);
      continue;
    }

    try {
      // Determine if it's an email or external link
      const isEmail = link.url.startsWith("mailto:");
      const emailAddress = isEmail ? link.url.replace("mailto:", "") : undefined;
      const externalUrl = !isEmail && link.url ? link.url : undefined;

      const fields: Record<string, unknown> = {
        contentfulDescription: localizedField(`Link: ${link.title}`),
        title: localizedField(link.title),
        category: localizedField(createEntryRef(categoryId)),
      };

      if (link.place) {
        fields.place = localizedField(link.place);
      }

      if (emailAddress) {
        fields.emailLink = localizedField(emailAddress);
      }

      if (externalUrl) {
        fields.externalLink = localizedField(externalUrl);
      }

      const entry = await env.createEntry("link", { fields });
      await entry.publish();
      logger.info(`  Created link: ${link.title}`);
      await delay(DELAY_BETWEEN_REQUESTS);
    }
    catch (error) {
      logger.error(`  Failed to create link: ${link.title} - ${formatError(error)}`);
    }
  }
}

async function createImageEntry(
  env: Environment,
  image: XmlImage,
  assetId: string,
  index: number,
  projectTitle: string,
): Promise<Entry | null> {
  try {
    const entry = await env.createEntry("image", {
      fields: {
        contentfulDescription: localizedField(`Image ${index}: ${projectTitle.substring(0, 50)}`),
        title: localizedField(image.title || undefined),
        image: localizedField(createAssetRef(assetId)),
        description: localizedField(undefined),
        altText: localizedField(undefined),
      },
    });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create image entry - ${formatError(error)}`);
    return null;
  }
}

async function createVideoEntry(
  env: Environment,
  video: XmlVideo,
  previewAssetId: string | null,
  index: number,
  projectTitle: string,
): Promise<Entry | null> {
  try {
    const videoUrl = video.videoType === "vimeo"
      ? `https://vimeo.com/${video.videoId}`
      : video.videoType === "youtube"
        ? `https://www.youtube.com/watch?v=${video.videoId}`
        : "";

    const fields: Record<string, unknown> = {
      contentfulDescription: localizedField(`Video ${index}: ${projectTitle.substring(0, 50)}`),
      title: localizedField(video.title || undefined),
      videoUrl: localizedField(videoUrl),
      autoStart: localizedField(video.autostart),
    };

    if (previewAssetId) {
      fields.previewImage = localizedField(createAssetRef(previewAssetId));
    }

    const entry = await env.createEntry("video", { fields });
    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create video entry - ${formatError(error)}`);
    return null;
  }
}

async function createImagesPanel(
  env: Environment,
  imageEntryIds: string[],
  title: string,
  slug: string,
  globalIndex: number,
  paragraphIndex: number,
): Promise<Entry | null> {
  if (imageEntryIds.length === 0)
    return null;

  try {
    // Make title unique by appending paragraph index, and truncate to 255 chars
    const uniqueTitle = paragraphIndex > 1
      ? `${title} (${paragraphIndex})`
      : title;
    const truncatedTitle = truncateSymbol(uniqueTitle) || `Images Panel ${globalIndex}`;

    const entry = await env.createEntry("imagesPanel", {
      fields: {
        contentfulDescription: localizedField(`Images Panel ${globalIndex}: ${title.substring(0, 40)}`),
        title: localizedField(truncatedTitle),
        slug: localizedField(slug || `images-panel-${globalIndex}-${Date.now()}`),
        images: localizedField(imageEntryIds.map(id => createEntryRef(id))),
      },
    });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create images panel - ${formatError(error)}`);
    return null;
  }
}

async function createVideosPanel(
  env: Environment,
  videoEntryIds: string[],
  title: string,
  slug: string,
  globalIndex: number,
  paragraphIndex: number,
): Promise<Entry | null> {
  if (videoEntryIds.length === 0)
    return null;

  try {
    // Make title unique by appending paragraph index, and truncate to 255 chars
    const uniqueTitle = paragraphIndex > 1
      ? `${title} (${paragraphIndex})`
      : title;
    const truncatedTitle = truncateSymbol(uniqueTitle) || `Videos Panel ${globalIndex}`;

    const entry = await env.createEntry("videosPanel", {
      fields: {
        contentfulDescription: localizedField(`Videos Panel ${globalIndex}: ${title.substring(0, 40)}`),
        title: localizedField(truncatedTitle),
        slug: localizedField(slug || `videos-panel-${globalIndex}-${Date.now()}`),
        videos: localizedField(videoEntryIds.map(id => createEntryRef(id))),
      },
    });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create videos panel - ${formatError(error)}`);
    return null;
  }
}

async function createTextPanel(
  env: Environment,
  text: string,
  index: number,
  projectTitle: string,
): Promise<Entry | null> {
  try {
    const richText = htmlToRichText(text);

    const entry = await env.createEntry("textPanel", {
      fields: {
        contentfulDescription: localizedField(`Text Panel ${index}: ${projectTitle.substring(0, 40)}`),
        text: localizedField(richText),
      },
    });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create text panel - ${formatError(error)}`);
    return null;
  }
}

async function createTextPage(
  env: Environment,
  textPage: XmlTextPage,
  index: number,
): Promise<Entry | null> {
  try {
    const richText = htmlToRichText(textPage.text);

    const entry = await env.createEntry("textPage", {
      fields: {
        contentfulDescription: localizedField(`Text Page: ${textPage.title.substring(0, 50)}`),
        title: localizedField(textPage.title),
        slug: localizedField(slugify(textPage.title) || `text-page-${index}-${Date.now()}`),
        oldSlug: localizedField(textPage.uid),
        text: localizedField(richText),
      },
    });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create text page: ${textPage.title} - ${formatError(error)}`);
    return null;
  }
}

async function createProjectRow(
  env: Environment,
  panelIds: string[],
  index: number,
  projectTitle: string,
  paragraphTitle?: string,
): Promise<Entry | null> {
  if (panelIds.length === 0)
    return null;

  try {
    const fields: Record<string, unknown> = {
      contentfulDescription: localizedField(`Row ${index}: ${projectTitle.substring(0, 50)}`),
      row: localizedField(panelIds.map(id => createEntryRef(id))),
    };

    // Use paragraph title if available, truncate to Symbol field limit
    if (paragraphTitle && paragraphTitle.trim()) {
      fields.title = localizedField(truncateSymbol(paragraphTitle));
    }

    const entry = await env.createEntry("projectRow", { fields });

    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create project row - ${formatError(error)}`);
    return null;
  }
}

async function createProject(
  env: Environment,
  project: XmlProject,
  categoryId: string,
  projectRowIds: string[],
  yearDayCounter: Map<string, number>,
): Promise<Entry | null> {
  try {
    // Truncate title to 255 chars (Symbol field limit)
    const truncatedTitle = truncateSymbol(project.title) || `Project ${Date.now()}`;

    const fields: Record<string, unknown> = {
      contentfulDescription: localizedField(`Project: ${project.title.substring(0, 50)}`),
      title: localizedField(truncatedTitle),
      slug: localizedField(slugify(project.title) || `project-${Date.now()}`),
      oldSlug: localizedField(project.uid),
      category: localizedField(createEntryRef(categoryId)),
    };

    if (project.year) {
      fields.year = localizedField(yearToDate(project.year, yearDayCounter));
    }

    if (project.place) {
      fields.place = localizedField(project.place);
    }

    if (projectRowIds.length > 0) {
      fields.projectRows = localizedField(projectRowIds.map(id => createEntryRef(id)));
    }

    const entry = await env.createEntry("project", { fields });
    await entry.publish();
    return entry;
  }
  catch (error) {
    logger.error(`  Failed to create project: ${project.title} - ${formatError(error)}`);
    return null;
  }
}

// =============================================================================
// Main Migration Function
// =============================================================================

async function migrateProjects(
  env: Environment,
  projects: XmlProject[],
  categoryMap: Map<string, string>,
): Promise<void> {
  logger.header("Creating projects...");

  // Track year occurrences to assign different days for projects with the same year
  const yearDayCounter = new Map<string, number>();

  let projectIndex = 0;
  let globalImageIndex = 0;
  let globalVideoIndex = 0;
  let globalTextPanelIndex = 0;
  let globalTextPageIndex = 0;
  let globalRowIndex = 0;
  let globalImagesPanelIndex = 0;
  let globalVideosPanelIndex = 0;

  for (const project of projects) {
    projectIndex++;
    logger.info(`\n  [${projectIndex}/${projects.length}] ${project.title}`);

    const categoryId = categoryMap.get(project.category);
    if (!categoryId) {
      logger.warn(`    Category not found: ${project.category}`);
      continue;
    }

    const projectRowIds: string[] = [];

    // Track paragraph index within this project for unique panel titles
    let projectParagraphIndex = 0;

    // Process each paragraph as a potential project row
    for (const paragraph of project.paragraphs) {
      projectParagraphIndex++;
      const rowPanelIds: string[] = [];

      // Process images in parallel
      if (paragraph.images.length > 0) {
        logger.info(`    Processing ${paragraph.images.length} images in parallel...`);
        const startImageIndex = globalImageIndex;

        // Step 1: Upload all assets in parallel batches
        const uploadResults = await processInBatches(
          paragraph.images,
          async (image, idx) => {
            const result = await uploadAssetFast(
              env,
              image.src,
              image.subtitle || "",
            );
            return { image, result, index: startImageIndex + idx + 1 };
          },
        );

        // Collect successful uploads with proper type narrowing
        const successfulUploads = uploadResults.filter(isSuccessfulUpload);
        const assetIds = successfulUploads.map(r => r.result.assetId);

        // Step 2: Wait for all assets to be processed and publish them
        if (assetIds.length > 0) {
          logger.info(`    Waiting for ${assetIds.length} assets to process...`);
          const publishedAssets = await waitAndPublishAssets(env, assetIds);

          // Step 3: Create image entries in parallel batches
          const entryResults = await processInBatches(
            successfulUploads,
            async ({ image, result, index }) => {
              if (!publishedAssets.has(result.assetId)) {
                return null;
              }
              return createImageEntry(env, image, result.assetId, index, project.title);
            },
          );

          const imageEntryIds: string[] = [];
          for (const entry of entryResults) {
            if (entry) {
              imageEntryIds.push(entry.sys.id);
            }
          }

          globalImageIndex += paragraph.images.length;

          // Create images panel
          if (imageEntryIds.length > 0) {
            globalImagesPanelIndex++;
            const imagesPanel = await createImagesPanel(
              env,
              imageEntryIds,
              project.title,
              `${slugify(project.title)}-images-${globalImagesPanelIndex}`,
              globalImagesPanelIndex,
              projectParagraphIndex,
            );

            if (imagesPanel) {
              rowPanelIds.push(imagesPanel.sys.id);
            }
          }
        }
        else {
          globalImageIndex += paragraph.images.length;
        }
      }

      // Process videos
      if (paragraph.videos.length > 0) {
        logger.info(`    Processing ${paragraph.videos.length} videos...`);
        const videoEntryIds: string[] = [];

        for (const video of paragraph.videos) {
          globalVideoIndex++;

          // Upload preview image
          let previewAssetId: string | null = null;
          if (video.src) {
            const previewAsset = await uploadAsset(
              env,
              video.src,
              "",
            );
            if (previewAsset) {
              previewAssetId = previewAsset.sys.id;
            }
          }

          // Create video entry
          const videoEntry = await createVideoEntry(
            env,
            video,
            previewAssetId,
            globalVideoIndex,
            project.title,
          );

          if (videoEntry) {
            videoEntryIds.push(videoEntry.sys.id);
          }

          await delay(DELAY_BETWEEN_REQUESTS);
        }

        // Create videos panel
        if (videoEntryIds.length > 0) {
          globalVideosPanelIndex++;
          const videosPanel = await createVideosPanel(
            env,
            videoEntryIds,
            project.title,
            `${slugify(project.title)}-videos-${globalVideosPanelIndex}`,
            globalVideosPanelIndex,
            projectParagraphIndex,
          );

          if (videosPanel) {
            rowPanelIds.push(videosPanel.sys.id);
          }
        }
      }

      // Process simple texts (as text panels)
      for (const simpleText of paragraph.simpleTexts) {
        globalTextPanelIndex++;
        logger.info(`    Creating text panel ${globalTextPanelIndex}...`);

        const textPanel = await createTextPanel(
          env,
          simpleText.text,
          globalTextPanelIndex,
          project.title,
        );

        if (textPanel) {
          rowPanelIds.push(textPanel.sys.id);
        }

        await delay(DELAY_BETWEEN_REQUESTS);
      }

      // Process text pages
      for (const textPage of paragraph.textPages) {
        globalTextPageIndex++;
        logger.info(`    Creating text page: ${textPage.title}...`);

        const textPageEntry = await createTextPage(env, textPage, globalTextPageIndex);

        if (textPageEntry) {
          rowPanelIds.push(textPageEntry.sys.id);
        }

        await delay(DELAY_BETWEEN_REQUESTS);
      }

      // Create project row if we have panels
      if (rowPanelIds.length > 0) {
        globalRowIndex++;
        const projectRow = await createProjectRow(
          env,
          rowPanelIds,
          globalRowIndex,
          project.title,
          paragraph.title,
        );

        if (projectRow) {
          projectRowIds.push(projectRow.sys.id);
        }

        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }

    // Create the project
    const projectEntry = await createProject(env, project, categoryId, projectRowIds, yearDayCounter);

    if (projectEntry) {
      logger.success(`    Created project: ${project.title}`);
    }

    await delay(DELAY_BETWEEN_REQUESTS);
  }
}

// =============================================================================
// Main Entry Point
// =============================================================================

async function main(): Promise<void> {
  const isSingleProjectMode = Boolean(targetProjectUid);

  if (isSingleProjectMode) {
    logger.header(`Starting single project migration (UID: ${targetProjectUid})...`);
  }
  else {
    logger.header("Starting XML to Contentful migration...");
  }

  // Read and parse XML file
  const xmlPath = join(__dirname, "info.xml");
  logger.info(`Reading XML file: ${xmlPath}`);

  const xmlContent = readFileSync(xmlPath, "utf-8");
  const data = parseXml(xmlContent);

  // Filter projects if single project mode
  const projectsToMigrate = isSingleProjectMode
    ? data.projects.filter(p => p.uid === targetProjectUid)
    : data.projects;

  if (isSingleProjectMode && projectsToMigrate.length === 0) {
    logger.error(`Project with UID "${targetProjectUid}" not found in XML data.`);
    logger.info(`Available project UIDs (first 10):`);
    data.projects.slice(0, 10).forEach(p => logger.info(`   - ${p.uid}: ${p.title}`));
    globalThis.process.exit(1);
  }

  logger.info(`\nParsed data summary:`);
  logger.info(`   Categories: ${data.categories.length}`);
  logger.info(`   Links: ${data.links.length}`);
  logger.info(`   Separators: ${data.separators.length}`);
  logger.info(`   Projects: ${projectsToMigrate.length}${isSingleProjectMode ? " (filtered)" : ""}`);

  // Get Contentful environment
  logger.info("\nConnecting to Contentful...");
  const env = await getEnvironment();
  logger.info(`   Connected to environment: ${env.sys.id}`);

  // Get or create categories (with skip-if-exists logic)
  const categoryMap = await getOrCreateCategories(env, data.categories);

  // Skip separators and links for single project migration
  if (!isSingleProjectMode) {
    // Create separators
    await createSeparators(env, data.separators, categoryMap);

    // Create links
    await createLinks(env, data.links, categoryMap);
  }
  else {
    logger.info("\nSkipping separators and links (single project mode)");
  }

  // Create projects with all nested content
  await migrateProjects(env, projectsToMigrate, categoryMap);

  logger.success("\nMigration completed!");
}

// Run the migration
main().catch((error) => {
  logger.error(`\nMigration failed: ${formatError(error)}`);
  globalThis.process.exit(1);
});
