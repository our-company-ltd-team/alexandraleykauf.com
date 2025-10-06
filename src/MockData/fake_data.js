export const MockGeneralConfig = {
  _id: "general-config",
  _type: "generalConfig",
  pageTitle: "Alexandra Leykauf",
  googleKeywords: "art, installation, photography",
  googleDescription: "Contemporary artist",
  googleAnalyticsCode: "UA-21115802-22",
  language: "en",
  smallPageIcon: {
    _type: "image",
    asset: { _ref: "/favicon.ico", _type: "reference" }
  },
  bigPageIcon: {
    _type: "image",
    asset: { _ref: "/favicon-big.png", _type: "reference" }
  },
  appleIcon: {
    _type: "image",
    asset: { _ref: "/apple-touch-icon.png", _type: "reference" }
  },
  hoverColor: "rgb(221,199,205)",
  activeColor: "rgb(198,212,219)",
  detailsBackgroundColor: "rgb(241,245,247)",
  footer: {
    text: "Imprint",
    url: "/imprint"
  }
};

export const MockCategories = [
  {
    _id: "cat-work",
    _type: "category",
    title: "Work",
    showOnStartPage: true,
    color: "rgb(207,221,238)"
  },
  {
    _id: "cat-cv",
    _type: "category",
    title: "CV",
    showOnStartPage: false,
    color: "rgb(221,199,205)"
  },
  {
    _id: "cat-contact",
    _type: "category",
    title: "Contact",
    showOnStartPage: false,
    color: "rgb(198,212,219)"
  }
];

export const MockProjects = [
  // Full project with interleaved content in paragraphs
  {
    _id: "proj-1",
    _type: "project",
    title: "I've looked at clouds",
    year: 2020,
    category: "cat-work",
    place: "Berlin",
    paragraphs: [
      {
        _key: "para-1",
        title: "Installation View",
        content: [
          {
            _key: "img-1",
            _type: "image",
            title: "Main Gallery",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/2_KM_Leykauf_I_ve_looked_at_clouds_2020_installation_view_Web.jpg", _type: "reference" }
            },
            description: "Kunstmuseum Wolfsburg, 2020"
          },
          {
            _key: "text-1",
            _type: "text",
            text: "This installation explores the ephemeral nature of clouds and their representation in art history."
          },
          {
            _key: "img-2",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/11_KM_Leykauf_Wassily_K__2020_Web.jpg", _type: "reference" }
            },
            description: "Detail view, Wassily K., 2020"
          },
          {
            _key: "vid-1",
            _type: "video",
            title: "Process Documentation",
            previewImage: {
              _type: "image",
              asset: { _ref: "/dropbox/2_de_Aubette__cine_dancing___3min___16mm__2009.jpg", _type: "reference" }
            },
            video: "vimeo,123456789",
            autorotate: false,
            description: "3min, 16mm, 2009"
          },
          {
            _key: "text-2",
            _type: "text",
            text: "Additional context about the work and its relationship to landscape painting."
          }
        ]
      },
      {
        _key: "para-2",
        title: "Details",
        content: [
          {
            _key: "img-3",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/14_KM_Leykauf_Ferdinand_H__2020_Web.jpg", _type: "reference" }
            },
            description: "Ferdinand H., 2020"
          },
          {
            _key: "img-4",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/21_KM_Leykauf_Marsden_H__2020_Web.jpg", _type: "reference" }
            },
            description: "Marsden H., 2020"
          }
        ]
      }
    ]
  },
  
  // Another project
  {
    _id: "proj-2",
    _type: "project",
    title: "Landscapes",
    year: 2018,
    category: "cat-work",
    place: "Munich",
    paragraphs: [
      {
        _key: "para-3",
        content: [
          {
            _key: "img-5",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/12_landscapes.jpg", _type: "reference" }
            }
          },
          {
            _key: "text-3",
            _type: "textPage",
            title: "About the Series",
            text: "A series exploring urban and natural landscapes through photographic intervention.",
            navigation: true,
            showTitle: true
          }
        ]
      }
    ]
  },
  {
    _id: "proj-3",
    _type: "project",
    title: "Landscapes",
    year: 2018,
    category: "cat-work",
    place: "Munich",
    paragraphs: [
      {
        _key: "para-4",
        content: [
          {
            _key: "img-5",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/12_landscapes.jpg", _type: "reference" }
            }
          },
          {
            _key: "text-4",
            _type: "textPage",
            title: "About the Series",
            text: "A series exploring urban and natural landscapes through photographic intervention.",
            navigation: true,
            showTitle: true
          }
        ]
      }
    ]
  },
  {
    _id: "proj-4",
    _type: "project",
    title: "Landscapes",
    year: 2018,
    category: "cat-work",
    place: "Munich",
    paragraphs: [
      {
        _key: "para-5",
        content: [
          {
            _key: "img-5",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/12_landscapes.jpg", _type: "reference" }
            }
          },
          {
            _key: "text-5",
            _type: "textPage",
            title: "About the Series",
            text: "A series exploring urban and natural landscapes through photographic intervention.",
            navigation: true,
            showTitle: true
          }
        ]
      }
    ]
  },

    // Separator
  {
    _id: "sep-1",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-2",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-3",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-4",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-5",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-6",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-7",
    _type: "separator",
    category: "cat-work"
  },
    // Separator
  {
    _id: "sep-8",
    _type: "separator",
    category: "cat-work"
  },
  {
    _id: "proj-5",
    _type: "project",
    title: "Landscapes",
    year: 2018,
    category: "cat-work",
    place: "Munich",
    paragraphs: [
      {
        _key: "para-6",
        content: [
          {
            _key: "img-6",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/12_landscapes.jpg", _type: "reference" }
            }
          },
          {
            _key: "text-6",
            _type: "textPage",
            title: "About the Series",
            text: "A series exploring urban and natural landscapes through photographic intervention.",
            navigation: true,
            showTitle: true
          }
        ]
      }
    ]
  },
  {
    _id: "proj-7",
    _type: "project",
    title: "Landscapes",
    year: 2018,
    category: "cat-work",
    place: "Munich",
    paragraphs: [
      {
        _key: "para-8",
        content: [
          {
            _key: "img-8",
            _type: "image",
            image: {
              _type: "image",
              asset: { _ref: "/dropbox/12_landscapes.jpg", _type: "reference" }
            }
          },
          {
            _key: "text-8",
            _type: "textPage",
            title: "About the Series",
            text: "A series exploring urban and natural landscapes through photographic intervention.",
            navigation: true,
            showTitle: true
          }
        ]
      }
    ]
  },
  
  // Link project (email)
  {
    _id: "link-1",
    _type: "link",
    title: "Contact",
    category: "cat-contact",
    linkType: "email",
    email: "info@alexandraleykauf.com"
  },
  
  // Link project (file)
  {
    _id: "link-2",
    _type: "link",
    title: "CV (PDF)",
    category: "cat-cv",
    linkType: "file",
    file: {
      _type: "file",
      asset: { _ref: "/assets/cv.pdf", _type: "reference" }
    }
  },
  
  // Link project (URL)
  {
    _id: "link-3",
    _type: "link",
    title: "Instagram",
    category: "cat-contact",
    linkType: "url",
    url: "https://instagram.com/alexandraleykauf"
  },
  
  // Separator
  {
    _id: "sep-9",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-91",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-92",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-93",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-94",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-95",
    _type: "separator",
    category: "cat-work"
  },
  
  // Separator
  {
    _id: "sep-96",
    _type: "separator",
    category: "cat-work"
  }
];