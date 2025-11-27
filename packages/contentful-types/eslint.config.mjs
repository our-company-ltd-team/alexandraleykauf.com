import antfu from "@antfu/eslint-config";

import { sharedRules, sharedStylistic } from "../../eslint.config.mjs";

export default antfu(
  {
    // Library package for types
    type: "lib",
    // Enable TypeScript linting rules
    typescript: true,
    // Enable auto-formatting for JSON, Markdown, etc.
    formatters: true,
    // Apply shared code style preferences
    stylistic: sharedStylistic,
  },
  {
    // Ignore generated files
    ignores: ["generated/**"],
  },
  {
    rules: {
      ...sharedRules,
    },
  },
  {
    // Allow require() in getContentfulEnvironment.ts (needed for contentful-typescript-codegen)
    files: ["getContentfulEnvironment.ts"],
    rules: {
      "ts/no-require-imports": "off",
      "unicorn/prefer-module": "off",
    },
  },
);
