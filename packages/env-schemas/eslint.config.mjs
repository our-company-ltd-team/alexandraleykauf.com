import antfu from "@antfu/eslint-config";

import { sharedRules, sharedStylistic } from "../../eslint.config.mjs";

export default antfu(
  {
    type: "lib",
    typescript: true,
    formatters: true,
    stylistic: sharedStylistic,
  },
  {
    rules: {
      ...sharedRules,
    },
  },
);
