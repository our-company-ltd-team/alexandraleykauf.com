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
        seoTitle
        seoDescription
        seoImagesCollection(limit: 3) {
          items {
            sys {
              id
            }
            url(transform: { width: 1200, height: 630 })
            width
            height
            description
          }
        }
      }
    }
  }
`);
