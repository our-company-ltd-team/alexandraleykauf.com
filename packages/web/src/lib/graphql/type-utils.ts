/**
 * GraphQL Type Utilities
 *
 * This module provides utility functions for working with
 * Contentful GraphQL responses. Since Contentful's GraphQL schema marks
 * almost all fields as nullable (to support both Preview and Delivery APIs),
 * these utilities help handle nullability in a type-safe way.
 *
 * @example
 * ```ts
 * import { isNotNull, getCollectionItems } from '@/lib/graphql/type-utils';
 *
 * // Filter nulls with proper type narrowing
 * const items = data?.items.filter(isNotNull);
 *
 * // Get items from a collection
 * const items = getCollectionItems(data?.projectCollection);
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
