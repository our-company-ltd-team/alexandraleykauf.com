import antfu from "@antfu/eslint-config";

// Shared stylistic configuration for all packages
export const sharedStylistic = {
  indent: 2, // Use 2 spaces for indentation
  semi: true, // Require semicolons at end of statements
  quotes: "double", // Use double quotes for strings
};

// Shared custom rules for all packages
export const sharedRules = {
  // Allow variable redeclaration in TypeScript (useful for function overloads and namespace merging)
  "ts/no-redeclare": "off",
  // Enforce "type" over "interface" for type definitions (personal preference, more flexible)
  "ts/consistent-type-definitions": ["error", "type"],
  // Warn on console.log statements (helps catch debugging code before commit)
  "no-console": ["warn"],
  // Allow top-level await (modern feature, required in some contexts)
  "antfu/no-top-level-await": ["off"],
  // Allow using global "process" object (common in Node.js code)
  "node/prefer-global/process": ["off"],
  // Disallow process.env access (encourages centralized env config and type safety)
  "node/no-process-env": ["error"],
  // Enforce sorted imports for consistency and easier git diffs
  "perfectionist/sort-imports": [
    "error",
    {
      tsconfigRootDir: ".", // Use root tsconfig for resolving imports
    },
  ],
  // Enforce kebab-case filenames (e.g., my-component.tsx) for consistency
  "unicorn/filename-case": [
    "error",
    {
      case: "kebabCase",
      ignore: ["README.md"], // Exception for conventional files
    },
  ],
};

// Root ESLint config (for root-level files and default settings)
export default antfu(
  {
    // Enable TypeScript linting rules
    typescript: true,
    // Enable auto-formatting for CSS, JSON, Markdown, etc.
    formatters: true,
    // Code style preferences
    stylistic: sharedStylistic,
  },
  {
    // Apply shared custom rules
    rules: sharedRules,
  },
  {
    // Allow require() in getContentfulEnvironment.ts (needed for contentful-typescript-codegen)
    files: ["packages/contentful-types/getContentfulEnvironment.ts"],
    rules: {
      "ts/no-require-imports": "off",
      "unicorn/prefer-module": "off",
      "unicorn/filename-case": "off",
    },
  },
);
