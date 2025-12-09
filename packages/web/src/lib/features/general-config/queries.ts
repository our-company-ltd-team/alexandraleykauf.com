/**
 * GraphQL queries for the general config.
 */

import { graphql } from "@/lib/graphql/generated";

/**
 * Fetches all data needed for the home page.
 */
export const getGeneralConfig = graphql(`
  query getGeneralConfig($preview: Boolean!, $limit: Int = 1) {
    generalConfigCollection(preview: $preview, limit: $limit) {
      items {
        sys{
          id
        }
        activeColor
        detailsBackgroundColor
        googleAnalyticsCode
        hoverColor
        seoDescription
        seoImage {
          url
        }
        seoTitle
      }
    }
  }
`);
