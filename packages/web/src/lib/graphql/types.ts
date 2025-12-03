/**
 * GraphQL response types for Contentful queries.
 * These types represent the shape of data returned from Contentful's GraphQL API.
 *
 * Note: These are intentionally separate from the REST API types in @alexandraleykauf/contentful-types
 * because GraphQL responses have a different structure (e.g., collections, sys fields).
 */

// ============================================================================
// System Types
// ============================================================================

export type ContentfulSys = {
  id: string;
};

export type ContentfulAsset = {
  sys: ContentfulSys;
  url: string;
  title: string | null;
  description: string | null;
  width: number | null;
  height: number | null;
};

// ============================================================================
// Category Types
// ============================================================================

export type CategoryGraphQL = {
  sys: ContentfulSys;
  title: string;
  slug: string;
  showOnStartPage: boolean | null;
  color: string;
};

// ============================================================================
// Panel Types (Images, Videos, Text)
// ============================================================================

export type ImageGraphQL = {
  sys: ContentfulSys;
  title: string | null;
  description: string | null;
  altText: string | null;
  image: ContentfulAsset | null;
};

export type ImagesPanelGraphQL = {
  __typename: "ImagesPanel";
  sys: ContentfulSys;
  title: string;
  slug: string;
  imagesCollection: {
    items: ImageGraphQL[];
  } | null;
};

export type VideoGraphQL = {
  sys: ContentfulSys;
  title: string | null;
  description: string | null;
  altText: string | null;
  previewImage: ContentfulAsset | null;
  video: ContentfulAsset | null;
  videoUrl: string | null;
  autoStart: boolean | null;
};

export type VideosPanelGraphQL = {
  __typename: "VideosPanel";
  sys: ContentfulSys;
  title: string;
  slug: string;
  videosCollection: {
    items: VideoGraphQL[];
  } | null;
};

export type TextPanelGraphQL = {
  __typename: "TextPanel";
  sys: ContentfulSys;
  text: {
    json: unknown;
  } | null;
};

export type TextPageGraphQL = {
  __typename: "TextPage";
  sys: ContentfulSys;
  title: string;
  slug: string;
  text: {
    json: unknown;
  } | null;
};

export type PanelGraphQL
  = | ImagesPanelGraphQL
    | VideosPanelGraphQL
    | TextPanelGraphQL
    | TextPageGraphQL;

// ============================================================================
// Project Row Types
// ============================================================================

export type ProjectRowGraphQL = {
  sys: ContentfulSys;
  rowCollection: {
    items: PanelGraphQL[];
  } | null;
};

// ============================================================================
// Project Types
// ============================================================================

export type ProjectListItemGraphQL = {
  sys: ContentfulSys;
  title: string;
  slug: string;
  year: string | null;
  place: string | null;
  category: CategoryGraphQL | null;
};

export type ProjectDetailGraphQL = {
  projectRowsCollection: {
    items: ProjectRowGraphQL[];
  } | null;
} & ProjectListItemGraphQL;

// ============================================================================
// Link Types
// ============================================================================

export type LinkGraphQL = {
  sys: ContentfulSys;
  title: string;
  place: string | null;
  category: CategoryGraphQL | null;
  externalLink: string | null;
  emailLink: string | null;
  pdfLink: ContentfulAsset | null;
};

// ============================================================================
// Separator Types
// ============================================================================

export type SeparatorGraphQL = {
  sys: ContentfulSys;
  category: CategoryGraphQL | null;
};

// ============================================================================
// Query Response Types
// ============================================================================

export type ProjectsQueryResponse = {
  projectCollection: {
    items: ProjectListItemGraphQL[];
  };
};

export type LinksQueryResponse = {
  linkCollection: {
    items: LinkGraphQL[];
  };
};

export type SeparatorsQueryResponse = {
  separatorCollection: {
    items: SeparatorGraphQL[];
  };
};

export type ProjectDetailQueryResponse = {
  project: ProjectDetailGraphQL | null;
};

export type ProjectPanelsQueryResponse = {
  project: {
    projectRowsCollection: {
      items: ProjectRowGraphQL[];
    } | null;
  } | null;
};

// ============================================================================
// Combined Home Page Types
// ============================================================================

export type HomePageItem
  = | { type: "project"; data: ProjectListItemGraphQL }
    | { type: "link"; data: LinkGraphQL }
    | { type: "separator"; data: SeparatorGraphQL };

export type HomePageDataQueryResponse = {
  projectCollection: {
    items: ProjectListItemGraphQL[];
  };
  linkCollection: {
    items: LinkGraphQL[];
  };
  separatorCollection: {
    items: SeparatorGraphQL[];
  };
  categoryCollection: {
    items: CategoryGraphQL[];
  };
};
