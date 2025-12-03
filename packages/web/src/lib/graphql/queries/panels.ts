/**
 * GraphQL queries for project panels (for prefetching on hover).
 */

export const GET_PROJECT_PANELS = /* GraphQL */ `
  query GetProjectPanels($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        projectRowsCollection {
          items {
            sys {
              id
            }
            rowCollection {
              items {
                __typename
                ... on ImagesPanel {
                  sys {
                    id
                  }
                  title
                  slug
                  imagesCollection {
                    items {
                      sys {
                        id
                      }
                      title
                      description
                      altText
                      image {
                        sys {
                          id
                        }
                        url
                        title
                        description
                        width
                        height
                      }
                    }
                  }
                }
                ... on VideosPanel {
                  sys {
                    id
                  }
                  title
                  slug
                  videosCollection {
                    items {
                      sys {
                        id
                      }
                      title
                      description
                      altText
                      previewImage {
                        sys {
                          id
                        }
                        url
                        title
                        width
                        height
                      }
                      video {
                        url
                      }
                      videoUrl
                      autoStart
                    }
                  }
                }
                ... on TextPanel {
                  sys {
                    id
                  }
                  text {
                    json
                  }
                }
                ... on TextPage {
                  sys {
                    id
                  }
                  title
                  slug
                  text {
                    json
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
