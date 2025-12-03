#!/usr/bin/env node
import { Command } from "commander";

import { deleteAssets } from "./commands/delete-assets.js";
import { deleteEntries } from "./commands/delete-entries.js";
import { generate } from "./commands/generate.js";
import { oneOff } from "./commands/one-off.js";
import { runAll } from "./commands/run-all.js";
import { run } from "./commands/run.js";
import { status } from "./commands/status.js";
import { validate } from "./commands/validate.js";

const program = new Command();

program
  .name("migrate")
  .description("Contentful migration CLI")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate a new migration file")
  .argument("<name>", "Name of the migration (kebab-case)")
  .option("--one-off", "Create a one-off migration instead of a regular migration")
  .action(async (name: string, options: { oneOff?: boolean }) => {
    await generate(name, options);
  });

program
  .command("run")
  .description("Run a single regular migration")
  .requiredOption("--name <name>", "Name of the migration to run (e.g., 0001-initial-content-model)")
  .option("--environment <env>", "Target environment (default: from .env)")
  .action(async (options: { name: string; environment?: string }) => {
    await run(options);
  });

program
  .command("run-all")
  .description("Run all pending regular migrations in order")
  .option("--environment <env>", "Target environment (default: from .env)")
  .action(async (options: { environment?: string }) => {
    await runAll(options);
  });

program
  .command("one-off")
  .description("Run a one-off migration")
  .requiredOption("--name <name>", "Name of the one-off migration to run")
  .option("--environment <env>", "Target environment (default: from .env)")
  .action(async (options: { name: string; environment?: string }) => {
    await oneOff(options);
  });

program
  .command("status")
  .description("Show the status of all migrations")
  .action(async () => {
    await status();
  });

program
  .command("validate")
  .description("Validate migration files")
  .action(async () => {
    await validate();
  });

program
  .command("delete-entries")
  .description("Delete all entries from the environment")
  .option("--dry-run", "Preview deletions without actually deleting")
  .option("--environment <env>", "Target environment (default: from .env)")
  .action(async (options: { dryRun?: boolean; environment?: string }) => {
    await deleteEntries(options);
  });

program
  .command("delete-assets")
  .description("Delete all assets from the environment")
  .option("--dry-run", "Preview deletions without actually deleting")
  .option("--environment <env>", "Target environment (default: from .env)")
  .action(async (options: { dryRun?: boolean; environment?: string }) => {
    await deleteAssets(options);
  });

program.parse();
