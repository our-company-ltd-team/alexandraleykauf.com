import type {
  Asset,
  Image as ContentfulImage,
  ProjectRow as ContentfulProjectRow,
  Video as ContentfulVideo,
  GetProjectMetadataQuery,
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
  PreviewImage,
  ProjectDetailImage,
  ProjectDetailImagesPanel,
  ProjectDetailTextPage,
  ProjectDetailVideo,
  ProjectDetailVideosPanel,
  ProjectImage,
  ProjectImagesOrVideosPanel,
  ProjectMetadata,
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
  switch (panel.__typename) {
    case "ImagesPanel":
      return transformImagesPanel(panel);
    case "VideosPanel":
      return transformVideosPanel(panel);
    case "TextPanel":
      return transformTextPanel(panel);
    case "TextPage":
      return transformTextPage(panel);
    default:
      return null;
  }
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

function transformImageAsset(data: Asset): ProjectImage | null {
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
    description: imageEntry.description?.json ?? undefined,
    altText: imageEntry.altText ?? undefined,
    image,
    width: imageEntry.image.width ?? 0,
    height: imageEntry.image.height ?? 0,
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

function transformPreviewImageAsset(data: Asset): PreviewImage | null {
  if (!data.url || !data.sys.id) {
    return null;
  }

  return {
    id: data.sys.id,
    url: data.url,
    width: data.width ?? undefined,
    height: data.height ?? undefined,
  };
}

function transformVideoEntry(videoEntry: ContentfulVideo): ProjectDetailVideo | null {
  if (!videoEntry.sys.id || !videoEntry.__typename) {
    return null;
  }

  // Video must have either an uploaded video or a videoUrl
  if (!videoEntry.video && !videoEntry.videoUrl) {
    return null;
  }

  const video = videoEntry.video ? transformVideoAsset(videoEntry.video) : null;
  const previewImage = videoEntry.previewImage ? transformPreviewImageAsset(videoEntry.previewImage) : null;

  return {
    id: videoEntry.sys.id,
    type: videoEntry.__typename,
    title: videoEntry.title ?? undefined,
    video: video ?? undefined,
    videoUrl: videoEntry.videoUrl ?? undefined,
    autoStart: videoEntry.autoStart ?? undefined,
    description: videoEntry.description?.json ?? undefined,
    previewImage: previewImage ?? undefined,
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

function transformTextPageForDetail(panel: TextPage): ProjectDetailTextPage | null {
  if (!panel.title || !panel.slug || !panel.text?.json) {
    return null;
  }

  return {
    type: panel.__typename,
    id: panel.sys.id,
    title: panel.title,
    slug: panel.slug,
    text: panel.text.json,
  };
}

// Transformers for single project panels
export function transformPanelBySlug(panel: GetProjectPanelBySlugQuery): ProjectDetailImagesPanel | ProjectDetailVideosPanel | ProjectDetailTextPage | null {
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

  if (panel.textPageCollection?.items?.[0]?.__typename === "TextPage") {
    const panelItem = getFirstItem(panel.textPageCollection);
    if (!panelItem) {
      return null;
    }
    return transformTextPageForDetail(panelItem as TextPage);
  }

  return null;
}

export function transformProjectMetadata(data: GetProjectMetadataQuery): ProjectMetadata | null {
  const project = data.projectCollection?.items?.[0];
  if (!project || !project.sys.id || !project.title) {
    return null;
  }

  const seoImages = project.seoImagesCollection?.items
    .filter(isNotNull)
    .map((image) => {
      if (!image.url || !image.sys.id) {
        return null;
      }

      return {
        id: image.sys.id,
        url: image.url,
        width: image.width ?? 0,
        height: image.height ?? 0,
        description: image.description ?? undefined,
      };
    })
    .filter(isNotNull);

  return {
    id: project.sys.id,
    title: project.title,
    seoTitle: project.seoTitle ?? undefined,
    seoDescription: project.seoDescription ?? undefined,
    seoImages: seoImages && seoImages.length > 0 ? seoImages : undefined,
  };
}
