/**
 * GraphQL queries for projects.
 */

import { graphql } from "@/lib/graphql/generated";

// /**
//  * Fetches a list of all projects.
//  */
// export const GetProjectsListDocument = graphql(`
//   query GetProjectsList {
//     projectCollection(order: sys_firstPublishedAt_DESC) {
//       items {
//         sys {
//           id
//         }
//         title
//         slug
//         year
//         place
//         category {
//           sys {
//             id
//           }
//           title
//           slug
//           showOnStartPage
//           color
//         }
//       }
//     }
//   }
// `);

// /**
//  * Fetches a single project by slug with all panel data.
//  */
// export const GetProjectBySlugDocument = graphql(`
//   query GetProjectBySlug($slug: String!) {
//     projectCollection(where: { slug: $slug }, limit: 1) {
//       items {
//         sys {
//           id
//         }
//         title
//         slug
//         year
//         place
//         category {
//           sys {
//             id
//           }
//           title
//           slug
//           showOnStartPage
//           color
//         }
//         projectRowsCollection {
//           items {
//             sys {
//               id
//             }
//             rowCollection {
//               items {
//                 __typename
//                 ... on ImagesPanel {
//                   sys {
//                     id
//                   }
//                   title
//                   slug
//                   imagesCollection {
//                     items {
//                       sys {
//                         id
//                       }
//                       title
//                       description
//                       altText
//                       image {
//                         sys {
//                           id
//                         }
//                         url
//                         title
//                         description
//                         width
//                         height
//                       }
//                     }
//                   }
//                 }
//                 ... on VideosPanel {
//                   sys {
//                     id
//                   }
//                   title
//                   slug
//                   videosCollection {
//                     items {
//                       sys {
//                         id
//                       }
//                       title
//                       description
//                       altText
//                       previewImage {
//                         sys {
//                           id
//                         }
//                         url
//                         title
//                         width
//                         height
//                       }
//                       video {
//                         url
//                       }
//                       videoUrl
//                       autoStart
//                     }
//                   }
//                 }
//                 ... on TextPanel {
//                   sys {
//                     id
//                   }
//                   text {
//                     json
//                   }
//                 }
//                 ... on TextPage {
//                   sys {
//                     id
//                   }
//                   title
//                   slug
//                   text {
//                     json
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `);

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
        projectRowsCollection(preview: $preview, limit: 8) {
          items {
            ...ContentfulSysId
            title
            rowCollection(preview: $preview,limit: 8) {
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
                        url(transform: { height: 50, format: WEBP})
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
                        url(transform: { height: 50, format: WEBP})
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
