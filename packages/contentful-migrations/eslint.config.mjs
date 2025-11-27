import antfu from "@antfu/eslint-config";

import { sharedRules, sharedStylistic } from "../../eslint.config.mjs";

export default antfu(
  {
    // Treat this as an application (CLI tool)
    type: "app",
    // Enable TypeScript linting rules
    typescript: true,
    // Enable auto-formatting for JSON, Markdown, etc.
    formatters: true,
    // Apply shared code style preferences
    stylistic: sharedStylistic,
  },
  {
    rules: {
      ...sharedRules,
    },
  },
);
