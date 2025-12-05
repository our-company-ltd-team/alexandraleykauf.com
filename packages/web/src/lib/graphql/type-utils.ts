/**
 * GraphQL Type Utilities
 *
 * This module provides utility types and type guards for working with
 * Contentful GraphQL responses. Since Contentful's GraphQL schema marks
 * almost all fields as nullable (to support both Preview and Delivery APIs),
 * these utilities help handle nullability in a type-safe way.
 *
 * @example
 * ```ts
 * import { isNotNull, CollectionItems } from '@/lib/graphql/type-utils';
 *
 * // Filter nulls with proper type narrowing
 * const items = data?.items.filter(isNotNull);
 *
 * // Extract item type from a collection
 * type ProjectItem = CollectionItems<ProjectCollection>;
 * ```
 */

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard that filters out null and undefined values.
 *
 * Use this with `.filter()` to remove nulls while narrowing the type.
 * TypeScript will understand the filtered array no longer contains nulls.
 *
 * @example
 * ```ts
 * const items: (Project | null)[] = [...];
 * const filtered = items.filter(isNotNull);
 * // filtered is now Project[] (no null!)
 * ```
 *
 * @param value - The value to check
 * @returns True if the value is not null or undefined
 */
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard that checks if a value is defined (not undefined).
 *
 * Useful when you only need to filter undefined, not null.
 *
 * @example
 * ```ts
 * const items: (string | undefined)[] = [...];
 * const filtered = items.filter(isDefined);
 * ```
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Type guard for discriminated unions using __typename.
 *
 * Creates a type guard function for a specific typename in a union.
 * Useful for filtering arrays of mixed content types.
 *
 * Note: With `nonOptionalTypename: true` in codegen, __typename is always present.
 *
 * @example
 * ```ts
 * const items: (Link | Project | Separator)[] = [...];
 *
 * // Filter to only projects
 * const projects = items.filter(hasTypename('Project'));
 * // projects is now Project[]
 *
 * // Or use directly
 * if (hasTypename('Link')(item)) {
 *   // item is narrowed to Link
 * }
 * ```
 */
export function hasTypename<
  T extends { __typename: string },
  K extends T["__typename"],
>(typename: K): (value: T) => value is Extract<T, { __typename: K }> {
  return (value): value is Extract<T, { __typename: K }> =>
    value.__typename === typename;
}

/**
 * Combined type guard: filters nulls AND checks typename.
 *
 * Useful when you have an array of nullable union types and want
 * to filter to a specific type in one step.
 *
 * Note: With `nonOptionalTypename: true` in codegen, __typename is always present.
 *
 * @example
 * ```ts
 * const items: (Link | Project | Separator | null)[] = [...];
 * const projects = items.filter(isTypename('Project'));
 * // projects is now Project[]
 * ```
 */
export function isTypename<
  T extends { __typename: string },
  K extends NonNullable<T>["__typename"],
>(
  typename: K,
): (value: T | null | undefined) => value is Extract<NonNullable<T>, { __typename: K }> {
  return (value): value is Extract<NonNullable<T>, { __typename: K }> =>
    value !== null && value !== undefined && value.__typename === typename;
}

// =============================================================================
// UTILITY TYPES - Collection Extraction
// =============================================================================

/**
 * Extracts the item type from a Contentful collection.
 *
 * Contentful collections have the shape `{ items: Array<T | null>, ... }`.
 * This utility extracts `T` (non-nullable item type).
 *
 * @example
 * ```ts
 * type ProjectCollection = { items: (Project | null)[], total: number };
 * type ProjectItem = CollectionItems<ProjectCollection>;
 * // ProjectItem is: Project
 * ```
 */
export type CollectionItems<T> = T extends { items: readonly (infer I)[] | (infer I)[] }
  ? NonNullable<I>
  : never;

/**
 * Extracts the item type from a collection, preserving nullability.
 *
 * Use this when you need to keep the `| null` in the type.
 *
 * @example
 * ```ts
 * type ProjectCollection = { items: (Project | null)[] };
 * type MaybeProject = CollectionItemsNullable<ProjectCollection>;
 * // MaybeProject is: Project | null
 * ```
 */
export type CollectionItemsNullable<T> = T extends {
  items: readonly (infer I)[] | (infer I)[];
}
  ? I
  : never;

// =============================================================================
// UTILITY TYPES - Safe Property Access
// =============================================================================

/**
 * Safely access a property on a potentially nullable type.
 *
 * Equivalent to `NonNullable<T>[K]` but more readable.
 *
 * @example
 * ```ts
 * type Query = { user?: { name: string } | null };
 * type User = SafeGet<Query, 'user'>;
 * // User is: { name: string }
 * ```
 */
export type SafeGet<T, K extends keyof NonNullable<T>> = NonNullable<T>[K];

/**
 * Get the element type from an array type.
 *
 * @example
 * ```ts
 * type Items = (Project | null)[];
 * type Item = ArrayElement<Items>;
 * // Item is: Project | null
 * ```
 */
export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;

/**
 * Get the non-nullable element type from an array.
 *
 * @example
 * ```ts
 * type Items = (Project | null)[];
 * type Item = ArrayElementNonNull<Items>;
 * // Item is: Project
 * ```
 */
export type ArrayElementNonNull<T> = NonNullable<ArrayElement<T>>;

// =============================================================================
// UTILITY TYPES - Deep Extraction
// =============================================================================

/**
 * Extract a deeply nested type from a query result.
 *
 * Navigates through nullable properties and arrays to extract a final type.
 * Pass a tuple of keys to traverse.
 *
 * @example
 * ```ts
 * type Query = {
 *   homepageCollection?: {
 *     items: ({
 *       contentCollection?: {
 *         items: (Link | Project | null)[]
 *       } | null
 *     } | null)[]
 *   } | null
 * };
 *
 * // Extract content items:
 * type ContentItem = DeepExtract<Query, ['homepageCollection', 'items', 0, 'contentCollection', 'items', 0]>;
 * // ContentItem is: Link | Project | null
 * ```
 */
export type DeepExtract<T, Path extends (string | number)[]> = Path extends [
  infer First,
  ...infer Rest,
]
  ? First extends keyof NonNullable<T>
    ? Rest extends (string | number)[]
      ? DeepExtract<NonNullable<T>[First], Rest>
      : never
    : First extends number
      ? T extends readonly (infer E)[]
        ? Rest extends (string | number)[]
          ? DeepExtract<E, Rest>
          : E
        : never
      : never
  : T;

/**
 * Like DeepExtract but returns NonNullable result.
 *
 * @example
 * ```ts
 * type ContentItem = DeepExtractNonNull<Query, ['homepageCollection', 'items', 0, 'contentCollection', 'items', 0]>;
 * // ContentItem is: Link | Project (no null!)
 * ```
 */
export type DeepExtractNonNull<T, Path extends (string | number)[]> = NonNullable<
  DeepExtract<T, Path>
>;

// =============================================================================
// UTILITY TYPES - Query Result Helpers
// =============================================================================

/**
 * Extract the first item from a Contentful collection query.
 *
 * Common pattern: `query.someCollection?.items[0]`
 *
 * @example
 * ```ts
 * type Query = { projectCollection?: { items: (Project | null)[] } | null };
 * type FirstProject = FirstCollectionItem<Query, 'projectCollection'>;
 * // FirstProject is: Project
 * ```
 */
export type FirstCollectionItem<
  TQuery,
  TKey extends keyof NonNullable<TQuery>,
> = CollectionItems<SafeGet<TQuery, TKey>>;

/**
 * Makes specific properties required (non-nullable).
 *
 * Use after validation to create a stricter type.
 *
 * @example
 * ```ts
 * type Project = { title?: string | null; slug?: string | null; year?: string | null };
 * type ValidProject = WithRequired<Project, 'title' | 'slug'>;
 * // ValidProject is: { title: string; slug: string; year?: string | null }
 * ```
 */
export type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Safely get items from a collection, filtering nulls.
 *
 * Combines optional chaining, default empty array, and null filtering.
 *
 * @example
 * ```ts
 * const items = getCollectionItems(data?.projectCollection);
 * // items is Project[] (never null/undefined, nulls filtered)
 * ```
 */
export function getCollectionItems<T>(
  collection: { items: (T | null | undefined)[] } | null | undefined,
): NonNullable<T>[] {
  return (collection?.items ?? []).filter(isNotNull) as NonNullable<T>[];
}

/**
 * Get the first item from a collection, or undefined.
 *
 * @example
 * ```ts
 * const homepage = getFirstItem(data?.homepageCollection);
 * // homepage is Homepage | undefined
 * ```
 */
export function getFirstItem<T>(
  collection: { items: (T | null | undefined)[] } | null | undefined,
): NonNullable<T> | undefined {
  const items = getCollectionItems(collection);
  return items[0];
}

/**
 * Assert that a value is not null/undefined, or throw.
 *
 * Use at boundaries where you expect data to exist.
 *
 * @example
 * ```ts
 * const project = assertDefined(data?.project, 'Project not found');
 * // project is guaranteed non-null, or throws
 * ```
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = "Expected value to be defined",
): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return value;
}
