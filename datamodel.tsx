interface FooterLink {
  text: string;
  url: string;
}

// General Config (singleton)
interface GeneralConfig {
  _id: string;
  _type: "generalConfig";
  pageTitle: string;
  googleKeywords?: string;
  googleDescription?: string;
  googleAnalyticsCode?: string;
  language?: string;
  smallPageIcon?: ImageAsset;
  bigPageIcon?: ImageAsset;
  appleIcon?: ImageAsset;
  appleIconPrecomposed?: ImageAsset;
  hoverColor?: string; // RGB format
  activeColor?: string;
  detailsBackgroundColor?: string;
  footer?: FooterLink; // HTML
}

// Category
interface Category {
  _id: string;
  _type: "category";
  title: string;
  showOnStartPage: boolean;
  color?: string; // RGB format
}

// Projects - 3 types
type Project = ProjectItem | ProjectLink | ProjectSeparator;

// Project Item (full project with paragraphs)
interface ProjectItem {
  _id: string;
  _type: "project";
  title: string;
  year?: number;
  category: string; // reference to Category._id
  place?: string;
  paragraphs?: Paragraph[];
}

interface Paragraph {
  _key: string;
  title?: string;
  content?: ParagraphContent[]; // single ordered array of mixed blocks
}

// Union type for all paragraph content blocks
type ParagraphContent = ImageBlock | TextBlock | VideoBlock;

interface ImageBlock {
  _key: string;
  _type: "image";
  title?: string;
  image: ImageAsset;
  description?: string; // HTML
}

interface TextBlock {
  _key: string;
  _type: "text" | "textPage";
  title?: string; // only for textPage
  text: string; // plain text
  navigation: boolean; // only for textPage
  showTitle: boolean; // only for textPage
}

interface VideoBlock {
  _key: string;
  _type: "video";
  title?: string;
  previewImage?: ImageAsset;
  video: string; // URL or vimeo,ID format
  autorotate?: boolean;
  description?: string; // HTML
}

// Project Link
interface ProjectLink {
  _id: string;
  _type: "link";
  title: string;
  category: string; // reference to Category._id
  linkType: "url" | "email" | "file";
  url?: string;
  email?: string;
  file?: FileAsset;
}

// Project Separator
interface ProjectSeparator {
  _id: string;
  _type: "separator";
  category: string; // reference to Category._id
}

// Shared types
interface ImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface FileAsset {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}