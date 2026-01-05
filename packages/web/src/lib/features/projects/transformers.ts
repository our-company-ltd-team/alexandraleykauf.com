import type {
  Asset,
  Image as ContentfulImage,
  ProjectRow as ContentfulProjectRow,
  Video as ContentfulVideo,
  GetProjectPanelBySlugQuery,
  GetProjectPanelsQuery,
  ImagesPanel,
  TextPage,
  TextPanel,
  VideosPanel,
} from "@/lib/graphql/generated/graphql";

import { getFirstItem, isNotNull } from "@/lib/graphql";

import type {
  HomeProjectPanels,
  Image,
  ProjectDetailImage,
  ProjectDetailImagesPanel,
  ProjectDetailVideo,
  ProjectDetailVideosPanel,
  ProjectImage,
  ProjectImagesOrVideosPanel,
  ProjectPanel,
  ProjectPreviewImage,
  ProjectRow,
  ProjectTextPage,
  ProjectTextPanel,
  Video,
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

export function transformImagePreview(data: ContentfulImage | ContentfulVideo): ProjectPreviewImage | null {
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

export function transformImagesPanel(panel: ImagesPanel): ProjectImagesOrVideosPanel | null {
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

export function transformVideosPanel(panel: VideosPanel): ProjectImagesOrVideosPanel | null {
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
    id: row.sys.id,
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
    id: project.sys.id,
    categoryColor: project.category?.color ?? "",
    rows: transformedRows,
  };
}

function transformImageAsset(data: Asset): Image | null {
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

function transformImageEntry(imageEntry: ContentfulImage): ProjectDetailImage | null {
  if (!imageEntry.sys.id || !imageEntry.__typename || !imageEntry.image) {
    return null;
  }

  const image = transformImageAsset(imageEntry.image);
  if (!image) {
    return null;
  }

  return {
    id: imageEntry.sys.id,
    type: imageEntry.__typename,
    title: imageEntry.title ?? undefined,
    description: imageEntry.description ?? undefined,
    altText: imageEntry.altText ?? undefined,
    image,
  };
}

function transformImagesPanelForDetail(panel: ImagesPanel): ProjectDetailImagesPanel | null {
  if (!panel.slug) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title ?? undefined,
    slug: panel.slug,
    images: panel.imagesCollection?.items.filter(isNotNull).map(transformImageEntry).filter(isNotNull),
  };
}

function transformVideoAsset(data: Asset): Video | null {
  if (!data.url || !data.sys.id) {
    return null;
  }

  return {
    id: data.sys.id,
    url: data.url,
  };
}

function transformVideoEntry(videoEntry: ContentfulVideo): ProjectDetailVideo | null {
  if (!videoEntry.sys.id || !videoEntry.__typename || !videoEntry.video) {
    return null;
  }

  const video = transformVideoAsset(videoEntry.video);
  if (!video) {
    return null;
  }

  return {
    id: videoEntry.sys.id,
    type: videoEntry.__typename,
    video,
    videoUrl: videoEntry.videoUrl ?? undefined,
    autoStart: videoEntry.autoStart ?? undefined,
    description: videoEntry.description ?? undefined,
  };
}

function transformVideosPanelForDetail(panel: VideosPanel): ProjectDetailVideosPanel | null {
  if (!panel.slug) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title ?? undefined,
    slug: panel.slug,
    videos: panel.videosCollection?.items.filter(isNotNull).map(transformVideoEntry).filter(isNotNull),
  };
}

// Transformers for single project panels
export function transformImagesPanelBySlug(panel: GetProjectPanelBySlugQuery): ProjectDetailImagesPanel | ProjectDetailVideosPanel | null {
  if (panel.imagesPanelCollection?.items.length) {
    const ImagesPanel = getFirstItem(panel.imagesPanelCollection);
    if (!ImagesPanel) {
      return null;
    }

    return transformImagesPanelForDetail(ImagesPanel as ImagesPanel);
  }

  if (panel.videosPanelCollection?.items?.[0]?.__typename === "VideosPanel") {
    const panelItem = getFirstItem(panel.videosPanelCollection);
    if (!panelItem) {
      return null;
    }
    return transformVideosPanelForDetail(panelItem as VideosPanel);
  }

  return null;
}
