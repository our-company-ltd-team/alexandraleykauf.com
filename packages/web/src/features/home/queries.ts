/**
 * GraphQL queries for the home page.
 */

import { graphql } from "@/lib/graphql/generated";

/**
 * Fetches all data needed for the home page.
 */
export const GetHomePageDataDocument = graphql(`
  query GetHomePageData {
    projectCollection(order: year_DESC, limit: 10) {
      items {
        sys {
          id
        }
        title
        slug
        year
        place
        category {
          sys {
            id
          }
          title
          slug
          showOnStartPage
          color
        }
      }
    }
    linkCollection {
      items {
        sys {
          id
        }
        title
        place
        category {
          sys {
            id
          }
          title
          slug
          showOnStartPage
          color
        }
        externalLink
        emailLink
        pdfLink {
          url
        }
      }
    }
    separatorCollection {
      items {
        sys {
          id
        }
        category {
          sys {
            id
          }
          title
          slug
          showOnStartPage
          color
        }
      }
    }
    categoryCollection {
      items {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
    }
  }
`);
