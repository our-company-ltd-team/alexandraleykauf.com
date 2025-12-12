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

export const seoFragment = graphql(`
  fragment Seo on Homepage {
    seoTitle
    seoDescription
    seoImage {
      url
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
        ...Seo
        contentCollection(preview: $preview) {
          items {
            ... on Link {
              __typename
              ...ContentfulSysId
              title
              emailLink
              externalLink
              pdfLink {
                url
              }
            }
            ... on Project {
              __typename
              ...ContentfulSysId
              title
              slug
              year
              place
              category {
                ...ContentfulSysId
                color
              }
              projectRowsCollection(preview: $preview, limit: 0) {
                total
              }
            }
            ... on Separator {
              __typename
              ...ContentfulSysId
            }
          }
        }
      }
    }
  }
`);

/*
    # projectCollection(
    #   preview: $preview,
    #   where: { projectRowsCollection_exists: true },
    #   order:  year_DESC )
    #   {
    #   items {
    #     __typename
    #     ...ContentfulSysId
    #     title
    #     slug
    #     year
    #   }
    # }
*/
