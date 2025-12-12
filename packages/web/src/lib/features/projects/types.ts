/**
 * Type definitions for the projects feature.
 *
 * These types are derived from the GetProjectPanelsQuery and provide
 * convenient type aliases for working with homepage data.
 *
 */

import type { Document } from "@contentful/rich-text-types";

import type { ImagesPanel, TextPage, TextPanel, VideosPanel } from "@/lib/graphql/generated/graphql";

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

export type ProjectImagesPanel = {
  type: ImagesPanel["__typename"];
  id: string;
  title: string;
  slug: string;
  previewImages: ProjectPreviewImage[];
};

export type ProjectVideosPanel = {
  type: VideosPanel["__typename"];
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

export type ProjectPanel = ProjectImagesPanel | ProjectVideosPanel | ProjectTextPanel | ProjectTextPage;

export type ProjectRow = {
  title: string;
  panels: ProjectPanel[];
};

export type HomeProjectPanels = {
  categoryColor: string;
  rows: ProjectRow[];
};
