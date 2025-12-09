/**
 * Type definitions for the home page feature.
 *
 * These types are derived from the GetHomepageQueryQuery and provide
 * convenient type aliases for working with homepage data.
 *
 * Colocated with queries.ts to keep related code together.
 */

import type { GetHomepageQueryQuery } from "@/lib/graphql/generated/graphql";
import type { CollectionItems, SafeGet } from "@/lib/graphql/type-utils";

/** The homepage data from the collection */
export type HomepageData = SafeGet<GetHomepageQueryQuery, "homepageCollection">;

/** A single homepage entry */
export type Homepage = CollectionItems<HomepageData>;

/** The content collection within a homepage */
export type ContentCollection = SafeGet<Homepage, "contentCollection">;

/** A single content item (Link | Project | Separator) */
export type HomepageContentItem = CollectionItems<ContentCollection>;

/** A single project item */
export type HomepageProjectItem = Extract<HomepageContentItem, { __typename: "Project" }>;

/** A single link item */
export type HomepageLinkItem = Extract<HomepageContentItem, { __typename: "Link" }>;
