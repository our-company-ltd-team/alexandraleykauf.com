/**
 * GraphQL queries for projects and home page data.
 */

export const GET_HOME_PAGE_DATA = /* GraphQL */ `
  query GetHomePageData {
    projectCollection(order: sys_firstPublishedAt_DESC) {
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
`;

export const GET_PROJECTS_LIST = /* GraphQL */ `
  query GetProjectsList {
    projectCollection(order: sys_firstPublishedAt_DESC) {
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
  }
`;

export const GET_PROJECT_BY_SLUG = /* GraphQL */ `
  query GetProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
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
