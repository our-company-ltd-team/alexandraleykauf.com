/**
 * GraphQL queries for projects.
 */

import { graphql } from "@/lib/graphql/generated";

/**
 * Fetches project panels for prefetching on hover.
 */
export const getProjectPanels = graphql(`
  query GetProjectPanels($preview: Boolean!, $slug: String!) {
    projectCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ...ContentfulSysId
        category {
          ...ContentfulSysId
          color
        }
        projectRowsCollection(preview: $preview, limit: 10) {
          items {
            ...ContentfulSysId
            title
            rowCollection(preview: $preview,limit: 10) {
              items {
                __typename
                ... on ImagesPanel {
                  ...ContentfulSysId
                  title
                  slug
                  imagesCollection(preview: $preview,limit: 30) {
                    items {
                      ...ContentfulSysId
                      __typename
                      altText
                      image {
                        sys {
                          id
                        }
                        url(transform: { height: 50 })
                        width
                        height
                      }
                    }
                  }
                }
                ... on VideosPanel {
                  ...ContentfulSysId
                  title
                  slug
                  videosCollection(preview: $preview,limit: 15) {
                    items {
                      ...ContentfulSysId
                      __typename
                      altText
                      previewImage {
                        sys {
                          id
                        }
                        url(transform: { height: 50 })
                        width
                        height
                      }
                    }
                  }
                }
                ... on TextPanel {
                  ...ContentfulSysId
                  __typename
                  text {
                    json
                  }
                }
                ... on TextPage {
                  ...ContentfulSysId
                  __typename
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`);

/**
 * Fetches project metadata by slug for SEO purposes.
 */
export const getProjectMetadata = graphql(`
  query GetProjectMetadata($preview: Boolean!, $slug: String!) {
    projectCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        ...ContentfulSysId
        title
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

/**
 * Fetches a single project panel by slug.
 */
export const getProjectPanelBySlug = graphql(`
  query GetProjectPanelBySlug($preview: Boolean!, $slug: String!) {
    imagesPanelCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        __typename
        ... on ImagesPanel {
          ...ContentfulSysId
          title
          slug
          imagesCollection(preview: $preview, limit: 30) {
            items {
              ...ContentfulSysId
              __typename
              title
              description {
                json
              }
              altText
              image {
                sys {
                  id
                }
                url
                width
                height
              }
            }
          }
        }
      }
    }
    videosPanelCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        __typename
          ... on VideosPanel {
            ...ContentfulSysId
          title
          slug
          videosCollection(preview: $preview,limit: 30) {
            items {
              ...ContentfulSysId
              __typename
              title
              previewImage {
                sys {
                  id
                }
                url
              }
              video {
                sys {
                  id
                }
                url
              }
              description {
                json
              }
              videoUrl
              autoStart
            }
          }
        }
      }
    }
    textPageCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        __typename
        ... on TextPage {
          ...ContentfulSysId
          title
          slug
          text {
            json
          }
        }
      }
    }
  }
`);

/**
 * Fetches all projects with their panels for sitemap generation.
 * Includes pagination support for projects with more than 100 items.
 */
export const getSitemapQuery = graphql(`
  query GetSitemapData($preview: Boolean!, $skip: Int = 0, $limit: Int = 100) {
    projectCollection(preview: $preview, skip: $skip, limit: $limit) {
      total
      items {
        ...ContentfulSysId
        slug
        sys {
          publishedAt
        }
        projectRowsCollection(preview: $preview, limit: 15) {
          items {
            ...ContentfulSysId
            rowCollection(preview: $preview, limit: 15) {
              items {
                __typename
                ... on ImagesPanel {
                  ...ContentfulSysId
                  slug
                  sys {
                    publishedAt
                  }
                  imagesCollection(preview: $preview, limit: 1) { 
                    total
                  }
                }
                ... on VideosPanel {
                  ...ContentfulSysId
                  slug
                  sys {
                    publishedAt
                  }
                  videosCollection(preview: $preview, limit: 1) {
                    total
                  }
                }
                ... on TextPage {
                  ...ContentfulSysId
                  slug
                  sys {
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
