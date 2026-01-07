import type { NextRequest } from "next/server";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/env";

/**
 * Contentful webhook payload structure.
 * Contentful sends entry data when content is published/unpublished/archived.
 */
type ContentfulWebhookPayload = {
  sys: {
    id: string;
    type: string;
    contentType?: {
      sys: {
        id: string;
      };
    };
  };
  fields?: {
    slug?: {
      "en-US"?: string;
    };
    [key: string]: unknown;
  };
};

/**
 * Maps Contentful content types to cache tags that should be invalidated.
 */
function getTagsForContentType(
  contentType: string,
  slug?: string,
): string[] {
  const tags: string[] = [];

  switch (contentType) {
    case "homepage":
      tags.push("home");
      break;

    case "project":
      tags.push("home"); // Projects appear on homepage
      if (slug) {
        tags.push(`project-${slug}`);
      }
      break;

    case "category":
      tags.push("header", "home"); // Categories affect header and homepage filtering
      break;

    case "generalConfig":
      tags.push("general-config");
      break;

    case "imagesPanel":
    case "videosPanel":
    case "textPage":
      if (slug) {
        tags.push(`panel-${slug}`);
      }
      break;

    case "link":
    case "separator":
      tags.push("home"); // Links and separators appear on homepage
      break;

    case "projectRow":
      // Project rows affect their parent project
      // Note: We'd need to fetch the parent project to get its slug
      // For now, invalidate all projects (could be optimized later)
      tags.push("home");
      break;

    case "image":
    case "video":
      // Images/videos affect their parent panel
      // Note: We'd need to fetch the parent panel to get its slug
      // For now, invalidate all panels (could be optimized later)
      // This is a broad invalidation, but acceptable for rare updates
      break;

    default:
      // Unknown content type - log but don't fail
      console.warn(`Unknown content type: ${contentType}`);
  }

  return tags;
}

/**
 * API route handler for Contentful webhooks.
 * Invalidates Next.js cache tags when content changes.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get("x-contentful-webhook-secret");
    if (!secret || secret !== env.CONTENTFUL_WEBHOOK_SECRET) {
      console.error("Invalid or missing webhook secret");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Parse webhook payload
    const body: ContentfulWebhookPayload = await request.json();

    // Extract content type and slug
    const contentType = body.sys?.contentType?.sys?.id;
    if (!contentType) {
      console.error("Missing contentType in webhook payload", body);
      return NextResponse.json(
        { error: "Missing contentType" },
        { status: 400 },
      );
    }

    // Extract slug if available
    const slug = body.fields?.slug?.["en-US"];

    // Determine which tags to invalidate
    const tagsToInvalidate = getTagsForContentType(contentType, slug);

    if (tagsToInvalidate.length === 0) {
      // No tags to invalidate (e.g., image/video without parent context)
      return NextResponse.json({
        revalidated: false,
        message: `No cache tags to invalidate for content type: ${contentType}`,
        now: Date.now(),
      });
    }

    // Invalidate all relevant tags
    for (const tag of tagsToInvalidate) {
      revalidateTag(tag, { expire: 60 * 60 * 24 }); // 24 hours
    }

    console.info(
      `Revalidated tags: ${tagsToInvalidate.join(", ")} for content type: ${contentType}`,
    );

    return NextResponse.json({
      revalidated: true,
      tags: tagsToInvalidate,
      contentType,
      slug: slug || null,
      now: Date.now(),
    });
  }
  catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
