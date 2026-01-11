import antfu from "@antfu/eslint-config";
import jsxA11y from "eslint-plugin-jsx-a11y";

import { sharedRules, sharedStylistic } from "../../eslint.config.mjs";

export default antfu(
  {
    // Treat this as an application (not a library), enables app-specific rules
    type: "app",
    // Enable Next.js specific linting rules (validates next/link, next/image usage, etc.)
    nextjs: true,
    // Enable React linting rules (hooks rules, JSX a11y, etc.)
    react: true,
    // Enable TypeScript linting rules
    typescript: true,
    // Enable auto-formatting for CSS, JSON, Markdown, etc.
    formatters: true,
    // Apply shared code style preferences
    stylistic: sharedStylistic,
  },
  {
    rules: sharedRules,
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
    },
  },
  // Global ignores for generated files (must be separate config object)
  {
    ignores: ["**/src/lib/graphql/generated/**"],
  },
);
