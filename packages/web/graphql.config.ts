import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "./schema.graphql",
  documents: ["src/features/**/queries.ts"],
  extensions: {
    languageService: {
      enableValidation: true,
    },
  },
};

export default config;
