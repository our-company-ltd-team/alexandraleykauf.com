import type { Entry } from "contentful-management";

import { ContentfulClient } from "../core/contentful-client.js";
import { getConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

// Configuration
const BATCH_CONCURRENCY = 5; // Process 5 entries at a time
const DELAY_BETWEEN_BATCHES = 200; // ms between batches

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type DeleteEntriesOptions = {
  dryRun?: boolean;
  environment?: string;
};

type DeleteResult = {
  entryId: string;
  success: boolean;
  error?: string;
};

/**
 * Process items in parallel with concurrency limit and error isolation
 */
async function processInBatches<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  concurrency: number,
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
    }

    // Small delay between batches to avoid rate limiting
    if (i + concurrency < items.length) {
      await delay(DELAY_BETWEEN_BATCHES);
    }
  }

  return results;
}

/**
 * Delete a single entry (unpublish first if needed)
 */
async function deleteEntry(entry: Entry): Promise<DeleteResult> {
  const entryId = entry.sys.id;

  try {
    // Unpublish if published
    if (entry.isPublished()) {
      await entry.unpublish();
    }

    // Delete the entry
    await entry.delete();

    return { entryId, success: true };
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { entryId, success: false, error: message };
  }
}

/**
 * Delete all entries from the environment
 */
export async function deleteEntries(options: DeleteEntriesOptions): Promise<void> {
  const config = getConfig();

  // Override environment if specified
  if (options.environment) {
    config.environment = options.environment;
  }

  const client = new ContentfulClient(config);
  const isDryRun = options.dryRun ?? false;

  logger.header(isDryRun ? "Delete All Entries (DRY RUN)" : "Delete All Entries");
  logger.info(`Environment: ${config.environment}`);

  if (isDryRun) {
    logger.warn("DRY RUN MODE: No entries will be deleted");
  }

  logger.newline();

  const environment = await client.getEnvironment();

  // Get all content types
  logger.info("Fetching content types...");
  const contentTypes = await environment.getContentTypes();
  logger.info(`Found ${contentTypes.items.length} content types`);
  logger.newline();

  let totalDeleted = 0;
  let totalFailed = 0;

  // Process each content type
  for (const contentType of contentTypes.items) {
    const contentTypeId = contentType.sys.id;
    const contentTypeName = contentType.name;

    logger.header(`Processing: ${contentTypeName} (${contentTypeId})`);

    // Fetch all entries for this content type with pagination
    let skip = 0;
    const limit = 100;
    let hasMore = true;
    let entriesForType = 0;
    let deletedForType = 0;
    let failedForType = 0;

    while (hasMore) {
      const response = await environment.getEntries({
        content_type: contentTypeId,
        limit,
        skip,
      });

      const entries = response.items as Entry[];
      const total = response.total;

      if (entries.length === 0) {
        hasMore = false;
        break;
      }

      entriesForType += entries.length;

      if (isDryRun) {
        // In dry-run mode, just log what would be deleted
        for (const entry of entries) {
          logger.info(`  Would delete: ${entry.sys.id}`);
        }
        totalDeleted += entries.length;
        deletedForType += entries.length;
      }
      else {
        // Process deletions in parallel batches
        logger.info(`  Deleting batch of ${entries.length} entries...`);

        const results = await processInBatches(
          entries,
          async entry => deleteEntry(entry),
          BATCH_CONCURRENCY,
        );

        // Process results
        for (const result of results) {
          if (result.success) {
            logger.info(`  Deleted: ${result.entryId}`);
            totalDeleted++;
            deletedForType++;
          }
          else {
            logger.error(`  Failed to delete ${result.entryId}: ${result.error}`);
            totalFailed++;
            failedForType++;
          }
        }
      }

      // For deletion, we don't increment skip because entries are removed
      // So we keep fetching from the beginning until there are no more
      if (isDryRun) {
        skip += limit;
        hasMore = skip < total;
      }
      else {
        // Re-fetch to see if there are more entries
        // (since we deleted some, the total has changed)
        hasMore = entries.length === limit;
      }
    }

    // Summary for this content type
    if (entriesForType === 0) {
      logger.info("  No entries found");
    }
    else if (isDryRun) {
      logger.info(`  Would delete: ${deletedForType} entries`);
    }
    else {
      logger.info(`  Deleted: ${deletedForType}, Failed: ${failedForType}`);
    }
  }

  // Final summary
  logger.newline();
  logger.header("Summary");

  if (isDryRun) {
    logger.info(`Total entries that would be deleted: ${totalDeleted}`);
    logger.warn("Run without --dry-run to actually delete entries");
  }
  else {
    logger.success(`Total entries deleted: ${totalDeleted}`);
    if (totalFailed > 0) {
      logger.error(`Total entries failed: ${totalFailed}`);
    }
  }
}
