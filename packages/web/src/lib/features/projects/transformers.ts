import type {
  Asset,
  ProjectRow as ContentfulProjectRow,
  GetProjectPanelsQuery,
  Image,
  ImagesPanel,
  TextPage,
  TextPanel,
  Video,
  VideosPanel,
} from "@/lib/graphql/generated/graphql";

import { isNotNull } from "@/lib/graphql";

import type {
  HomeProjectPanels,
  ProjectImage,
  ProjectImagesPanel,
  ProjectPanel,
  ProjectPreviewImage,
  ProjectRow,
  ProjectTextPage,
  ProjectTextPanel,
  ProjectVideosPanel,
} from "./types";

export function transformImage(data: Asset): ProjectImage | null {
  if (!data.url || !data.sys.id) {
    return null;
  }

  return {
    id: data.sys.id,
    url: data.url,
    width: data.width || 0,
    height: data.height || 0,
  };
}

export function transformImagePreview(data: Image | Video): ProjectPreviewImage | null {
  const image = data.__typename === "Image" ? data.image : data.previewImage;
  if (!image) {
    return null;
  }

  const transformedImage = transformImage(image);
  if (!transformedImage) {
    return null;
  }

  return {
    id: data.sys.id,
    altText: data.altText ?? undefined,
    image: transformedImage,
  };
}

export function transformImagesPanel(panel: ImagesPanel): ProjectImagesPanel | null {
  if (!panel.slug || !panel.title) {
    return null;
  }

  const previewImages = panel.imagesCollection?.items
    .filter(isNotNull)
    .map(transformImagePreview)
    .filter(isNotNull);

  if (!previewImages || previewImages.length === 0) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title,
    slug: panel.slug,
    previewImages,
  };
}

export function transformVideosPanel(panel: VideosPanel): ProjectVideosPanel | null {
  if (!panel.slug || !panel.title) {
    return null;
  }

  const previewImages = panel.videosCollection?.items
    .filter(isNotNull)
    .map(transformImagePreview)
    .filter(isNotNull);

  if (!previewImages || previewImages.length === 0) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title,
    slug: panel.slug,
    previewImages,
  };
}

export function transformTextPanel(panel: TextPanel): ProjectTextPanel | null {
  if (!panel.text?.json) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    text: panel.text.json,
  };
}

export function transformTextPage(panel: TextPage): ProjectTextPage | null {
  if (!panel.title || !panel.slug) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title,
    slug: panel.slug,
  };
}

export function transformPanel(panel: ImagesPanel | VideosPanel | TextPanel | TextPage): ProjectPanel | null {
  if (panel.__typename === "ImagesPanel") {
    if (!panel.title || !panel.slug) {
      return null;
    }

    const previewImages = panel.imagesCollection?.items
      .filter(isNotNull)
      .map(transformImagePreview)
      .filter(isNotNull);

    if (!previewImages || previewImages.length === 0) {
      return null;
    }

    return {
      type: panel.__typename,
      id: panel.sys.id,
      title: panel.title,
      slug: panel.slug,
      previewImages,
    };
  }

  if (panel.__typename === "VideosPanel") {
    if (!panel.title || !panel.slug) {
      return null;
    }

    const previewImages = panel.videosCollection?.items
      .filter(isNotNull)
      .map(transformImagePreview)
      .filter(isNotNull);

    if (!previewImages || previewImages.length === 0) {
      return null;
    }

    return {
      type: panel.__typename,
      id: panel.sys.id,
      title: panel.title,
      slug: panel.slug,
      previewImages,
    };
  }

  if (panel.__typename === "TextPanel") {
    if (!panel.text?.json) {
      return null;
    }

    return transformTextPanel(panel);
  }

  if (panel.__typename === "TextPage") {
    if (!panel.title || !panel.slug) {
      return null;
    }

    return transformTextPage(panel);
  }

  return null;
}

export function transformRow(row: ContentfulProjectRow): ProjectRow | null {
  const panels = row.rowCollection?.items.filter(isNotNull);
  if (!panels || panels.length === 0) {
    return null;
  }

  const transformedPanels = panels.map(transformPanel).filter(isNotNull);
  if (transformedPanels.length === 0) {
    return null;
  }

  return {
    title: row.title ?? "",
    panels: transformedPanels,
  };
}

export function transformProject(data: GetProjectPanelsQuery): HomeProjectPanels | null {
  const project = data.projectCollection?.items?.[0];
  if (!project) {
    return null;
  }

  const projectRows = project.projectRowsCollection?.items.filter(isNotNull) as ContentfulProjectRow[] | undefined;

  if (!projectRows) {
    return null;
  }

  const transformedRows = projectRows.map(transformRow).filter(isNotNull);

  if (transformedRows.length === 0) {
    return null;
  }

  return {
    categoryColor: project.category?.color ?? "",
    rows: transformedRows,
  };
}
