/**
 * Type definitions for the projects feature.
 *
 * These types are derived from the GetProjectPanelsQuery and provide
 * convenient type aliases for working with homepage data.
 *
 */

import type { Document } from "@contentful/rich-text-types";

import type { SeoImage } from "@/lib/features/general-config/types";
import type { Image as ContentfulImage, Video as ContentfulVideo, ImagesPanel, TextPage, TextPanel, VideosPanel } from "@/lib/graphql/generated/graphql";

export type ProjectImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type ProjectPreviewImage = {
  id: string;
  altText: string | undefined;
  image: ProjectImage;
};

export type ProjectImagesOrVideosPanel = {
  type: ImagesPanel["__typename"] | VideosPanel["__typename"];
  id: string;
  title: string;
  slug: string;
  previewImages: ProjectPreviewImage[];
};

export type ProjectTextPanel = {
  type: TextPanel["__typename"];
  id: string;
  text: Document;
};

export type ProjectTextPage = {
  type: TextPage["__typename"];
  id: string;
  title: string;
  slug: string;
};

export type ProjectPanel = ProjectImagesOrVideosPanel | ProjectTextPanel | ProjectTextPage;

export type ProjectRow = {
  id: string;
  title: string;
  panels: ProjectPanel[];
};

export type HomeProjectPanels = {
  id: string;
  categoryColor: string;
  rows: ProjectRow[];
};

export type ProjectDetailImage = {
  id: string;
  type: ContentfulImage["__typename"];
  title: string | undefined;
  description: Document | undefined;
  altText: string | undefined;
  image: ProjectImage | undefined;
  width: number;
  height: number;
};

export type ProjectDetailImagesPanel = {
  type: ImagesPanel["__typename"];
  id: string;
  title: string | undefined;
  slug: string;
  images: Array<ProjectDetailImage> | undefined;
};

export type Video = {
  id: string;
  url: string;
};

export type PreviewImage = {
  id: string;
  url: string;
  width?: number;
  height?: number;
};

export type ProjectDetailVideo = {
  title: string | undefined;
  autoStart: boolean | undefined;
  description: Document | undefined;
  id: string;
  type: ContentfulVideo["__typename"];
  video: Video | undefined;
  videoUrl: string | undefined;
  previewImage: PreviewImage | undefined;
};

export type ProjectDetailVideosPanel = {
  type: VideosPanel["__typename"];
  id: string;
  title: string | undefined;
  slug: string | undefined;
  videos: Array<ProjectDetailVideo> | undefined;
};

export type ProjectDetailTextPage = {
  type: TextPage["__typename"];
  id: string;
  title: string;
  slug: string;
  text: Document;
};

export type ProjectMetadata = {
  id: string;
  title: string;
  seoTitle: string | undefined;
  seoDescription: string | undefined;
  seoImages: SeoImage[] | undefined;
};
