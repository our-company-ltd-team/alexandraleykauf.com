export interface FooterLink {
  text: string;
  url: string;
}

export interface GeneralConfig {
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
  hoverColor?: string;
  activeColor?: string;
  detailsBackgroundColor?: string;
  footer?: FooterLink;
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  showOnStartPage: boolean;
  color?: string;
}

export type Project = ProjectItem | ProjectLink | ProjectSeparator;

export interface ProjectItem {
  _id: string;
  _type: "project";
  title: string;
  year?: number;
  category: string;
  place?: string;
  paragraphs?: Paragraph[];
}

export interface Paragraph {
  _key: string;
  title?: string;
  content?: ParagraphContent[];
}

export type ParagraphContent = ImagesBlock | TextBlock | VideoBlock;

export interface ImagesBlock {
  _key: string;
  _type: "image";
  title?: string;
  description?: string;
  images: ImageItem[];  // changed from ImageAsset[]
}

export interface TextBlock {
  _key: string;
  _type: "text" | "textPage";
  title?: string;
  text: string;
  navigation?: boolean;
  showTitle?: boolean;
}

export interface VideoBlock {
  _key: string;
  _type: "video";
  videos: VideoItem[];  // changed from single video to array
}

export interface VideoItem {
  _key: string;          
  title?: string;        
  description?: string;  
  previewImage?: ImageAsset;  
  video: string;         
  autorotate?: boolean;  
}

export interface ProjectLink {
  _id: string;
  _type: "link";
  title: string;
  category: string;
  linkType: "url" | "email" | "file";
  url?: string;
  email?: string;
  file?: FileAsset;
}

export interface ProjectSeparator {
  _id: string;
  _type: "separator";
  category: string;
}

export interface ImageItem {
  _key: string;          
  asset: ImageAsset;     
  title?: string;        
  description?: string;  
}

export interface ImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface FileAsset {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}