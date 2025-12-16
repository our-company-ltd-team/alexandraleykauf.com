/**
 * GraphQL queries for the header.
 */

import { graphql } from "@/lib/graphql/generated";

/**
 * Fetches all data needed for the home page.
 */
export const getHeader = graphql(`
  query getHeader($preview: Boolean!) {
    categoryCollection(preview: $preview) {
      items {
        sys {
          id
        }
        slug
        title
        showOnStartPage
        showItemsInHomepage
        color
      }
    }
  }
`);
