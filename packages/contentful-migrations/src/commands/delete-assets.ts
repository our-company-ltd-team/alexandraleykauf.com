import type { Asset } from "contentful-management";

import { ContentfulClient } from "../core/contentful-client.js";
import { getConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

// Configuration
const BATCH_CONCURRENCY = 5; // Process 5 assets at a time
const DELAY_BETWEEN_BATCHES = 200; // ms between batches

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type DeleteAssetsOptions = {
  dryRun?: boolean;
  environment?: string;
};

type DeleteResult = {
  assetId: string;
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
 * Delete a single asset (unpublish first if needed)
 */
async function deleteAsset(asset: Asset): Promise<DeleteResult> {
  const assetId = asset.sys.id;

  try {
    // Unpublish if published
    if (asset.isPublished()) {
      await asset.unpublish();
    }

    // Delete the asset
    await asset.delete();

    return { assetId, success: true };
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { assetId, success: false, error: message };
  }
}

/**
 * Delete all assets from the environment
 */
export async function deleteAssets(options: DeleteAssetsOptions): Promise<void> {
  const config = getConfig();

  // Override environment if specified
  if (options.environment) {
    config.environment = options.environment;
  }

  const client = new ContentfulClient(config);
  const isDryRun = options.dryRun ?? false;

  logger.header(isDryRun ? "Delete All Assets (DRY RUN)" : "Delete All Assets");
  logger.info(`Environment: ${config.environment}`);

  if (isDryRun) {
    logger.warn("DRY RUN MODE: No assets will be deleted");
  }

  logger.newline();

  const environment = await client.getEnvironment();

  // Fetch all assets with pagination
  let skip = 0;
  const limit = 100;
  let hasMore = true;
  let totalDeleted = 0;
  let totalFailed = 0;

  logger.info("Fetching and deleting assets...");
  logger.newline();

  while (hasMore) {
    const response = await environment.getAssets({
      limit,
      skip: isDryRun ? skip : 0, // For actual deletion, always fetch from start
    });

    const assets = response.items;
    const total = response.total;

    if (assets.length === 0) {
      hasMore = false;
      break;
    }

    if (isDryRun) {
      // In dry-run mode, just log what would be deleted
      for (const asset of assets) {
        const title = asset.fields.title?.["en-US"] || asset.sys.id;
        logger.info(`  Would delete: ${asset.sys.id} (${title})`);
      }
      totalDeleted += assets.length;
      skip += limit;
      hasMore = skip < total;
    }
    else {
      // Process deletions in parallel batches
      logger.info(`  Deleting batch of ${assets.length} assets...`);

      const results = await processInBatches(
        assets,
        async asset => deleteAsset(asset),
        BATCH_CONCURRENCY,
      );

      // Process results
      for (const result of results) {
        if (result.success) {
          logger.info(`  Deleted: ${result.assetId}`);
          totalDeleted++;
        }
        else {
          logger.error(`  Failed to delete ${result.assetId}: ${result.error}`);
          totalFailed++;
        }
      }

      // Keep fetching from start since assets are removed
      hasMore = assets.length === limit;
    }
  }

  // Final summary
  logger.newline();
  logger.header("Summary");

  if (isDryRun) {
    logger.info(`Total assets that would be deleted: ${totalDeleted}`);
    logger.warn("Run without --dry-run to actually delete assets");
  }
  else {
    logger.success(`Total assets deleted: ${totalDeleted}`);
    if (totalFailed > 0) {
      logger.error(`Total assets failed: ${totalFailed}`);
    }
  }
}
