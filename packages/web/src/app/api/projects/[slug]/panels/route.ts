import { NextResponse } from "next/server";

import { env } from "@/env";
import { REVALIDATION_TIME } from "@/lib/constants";
import { getProjectPanels } from "@/lib/features/projects/queries";
import { transformProject } from "@/lib/features/projects/transformers";
import { execute } from "@/lib/graphql/client";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

/**
 * API route for fetching project panels with server-side caching.
 * This route proxies Contentful GraphQL queries through Next.js cache,
 * reducing direct API calls on page refreshes.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route
 */
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

    // Fetch from Contentful with caching
    const response = await execute({
      query: getProjectPanels,
      variables: { preview: isPreview, slug },
      options: {
        revalidate: REVALIDATION_TIME,
        tags: [`project-panels-${slug}`],
      },
    });

    // Transform the data using the same transformer as server-side
    const transformedData = transformProject(response);

    if (!transformedData) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(transformedData, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATION_TIME}, stale-while-revalidate`,
      },
    });
  }
  catch (error) {
    console.error("Error fetching project panels:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch project panels",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
