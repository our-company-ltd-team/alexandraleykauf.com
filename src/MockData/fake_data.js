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
    asset: { _ref: "favicon-ref", _type: "reference" }
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
  // Full project with paragraphs
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
        images: [
          {
            _key: "img-1",
            title: "Main Gallery",
            image: {
              _type: "image",
              asset: { _ref: "image-ref-1", _type: "reference" }
            },
            description: "<p>Kunstmuseum Wolfsburg, 2020</p>"
          }
        ],
        texts: [
          {
            _key: "text-1",
            _type: "text",
            text: "<p>This installation explores...</p>"
          }
        ],
        videos: [
          {
            _key: "vid-1",
            title: "Process Documentation",
            previewImage: {
              _type: "image",
              asset: { _ref: "thumb-ref-1", _type: "reference" }
            },
            video: "vimeo,123456789",
            autorotate: false,
            description: "<p>3min, 16mm, 2009</p>"
          }
        ]
      }
    ]
  },
  
  // Link project
  {
    _id: "link-1",
    _type: "link",
    title: "Contact",
    category: "cat-contact",
    linkType: "email",
    email: "info@alexandraleykauf.com"
  },
  
  // Separator
  {
    _id: "sep-1",
    _type: "separator",
    category: "cat-work"
  }
];