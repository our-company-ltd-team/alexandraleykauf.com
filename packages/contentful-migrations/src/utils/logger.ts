/* eslint-disable no-console */
import chalk from "chalk";

/**
 * Logging utility with colored output
 */
export const logger = {
  info: (message: string) => {
    console.log(chalk.blue("ℹ"), message);
  },

  success: (message: string) => {
    console.log(chalk.green("✓"), message);
  },

  warn: (message: string) => {
    console.log(chalk.yellow("⚠"), message);
  },

  error: (message: string) => {
    console.log(chalk.red("✗"), message);
  },

  migration: (name: string, status: "pending" | "running" | "applied" | "failed") => {
    const icons = {
      pending: chalk.gray("○"),
      running: chalk.blue("●"),
      applied: chalk.green("●"),
      failed: chalk.red("●"),
    };
    const colors = {
      pending: chalk.gray,
      running: chalk.blue,
      applied: chalk.green,
      failed: chalk.red,
    };
    console.log(`  ${icons[status]} ${colors[status](name)}`);
  },

  table: (headers: string[], rows: string[][]) => {
    // Calculate column widths
    const widths = headers.map((h, i) =>
      Math.max(h.length, ...rows.map(r => (r[i] || "").length)),
    );

    // Print header
    const headerRow = headers.map((h, i) => h.padEnd(widths[i])).join("  ");
    console.log(chalk.bold(headerRow));
    console.log(chalk.gray("-".repeat(headerRow.length)));

    // Print rows
    for (const row of rows) {
      console.log(row.map((cell, i) => cell.padEnd(widths[i])).join("  "));
    }
  },

  newline: () => {
    console.log();
  },

  header: (title: string) => {
    console.log();
    console.log(chalk.bold.underline(title));
    console.log();
  },
};
