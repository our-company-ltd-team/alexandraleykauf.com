/**
 * GraphQL queries for the home page.
 */

import { graphql } from "@/lib/graphql/generated";

// Define the fragment
export const contentfulSysIdFragment = graphql(`
  fragment ContentfulSysId on Entry {
    sys{
      id
    }
  }
`);

/**
 * Fetches all data needed for the home page.
 */
export const getHomepageQuery = graphql(`
  query getHomepageQuery($preview: Boolean!, $limit: Int = 1) {
    homepageCollection(preview: $preview, limit: $limit) {
      items {
        ...ContentfulSysId
        seoTitle
        seoDescription
        seoImage {
          url
        }
        contentCollection(preview: $preview) {
          items {
            __typename
            ... on Project {
              ...ContentfulSysId
              title
              slug
              year
            }
            ... on Link {
              ...ContentfulSysId
              title
              emailLink
              externalLink
              pdfLink {
                url
              }
            }
            ... on Separator {
              ...ContentfulSysId
            }
          }
        }
      }
    }
  }
`);
