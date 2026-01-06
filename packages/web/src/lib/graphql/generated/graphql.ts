/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: { input: any; output: any; }
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: { input: any; output: any; }
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  generalConfigCollection?: Maybe<GeneralConfigCollection>;
  homepageCollection?: Maybe<HomepageCollection>;
  imageCollection?: Maybe<ImageCollection>;
  linkCollection?: Maybe<LinkCollection>;
  videoCollection?: Maybe<VideoCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsGeneralConfigCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsHomepageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsVideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const AssetOrder = {
  ContentTypeAsc: 'contentType_ASC',
  ContentTypeDesc: 'contentType_DESC',
  FileNameAsc: 'fileName_ASC',
  FileNameDesc: 'fileName_DESC',
  HeightAsc: 'height_ASC',
  HeightDesc: 'height_DESC',
  SizeAsc: 'size_ASC',
  SizeDesc: 'size_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  UrlAsc: 'url_ASC',
  UrlDesc: 'url_DESC',
  WidthAsc: 'width_ASC',
  WidthDesc: 'width_DESC'
} as const;

export type AssetOrder = typeof AssetOrder[keyof typeof AssetOrder];
/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type Category = Entry & _Node & {
  __typename: 'Category';
  _id: Scalars['ID']['output'];
  color?: Maybe<Scalars['String']['output']>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<CategoryLinkingCollections>;
  showItemsInHomepage?: Maybe<Scalars['Boolean']['output']>;
  showOnStartPage?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryShowItemsInHomepageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryShowOnStartPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategorySlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type CategoryTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryCollection = {
  __typename: 'CategoryCollection';
  items: Array<Maybe<Category>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CategoryFilter = {
  AND?: InputMaybe<Array<InputMaybe<CategoryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CategoryFilter>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  showItemsInHomepage?: InputMaybe<Scalars['Boolean']['input']>;
  showItemsInHomepage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showItemsInHomepage_not?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage_not?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoryLinkingCollections = {
  __typename: 'CategoryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  linkCollection?: Maybe<LinkCollection>;
  projectCollection?: Maybe<ProjectCollection>;
  separatorCollection?: Maybe<SeparatorCollection>;
};


export type CategoryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CategoryLinkingCollectionsLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CategoryLinkingCollectionsLinkCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CategoryLinkingCollectionsProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CategoryLinkingCollectionsProjectCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CategoryLinkingCollectionsSeparatorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CategoryLinkingCollectionsSeparatorCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const CategoryLinkingCollectionsLinkCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  EmailLinkAsc: 'emailLink_ASC',
  EmailLinkDesc: 'emailLink_DESC',
  ExternalLinkAsc: 'externalLink_ASC',
  ExternalLinkDesc: 'externalLink_DESC',
  PlaceAsc: 'place_ASC',
  PlaceDesc: 'place_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type CategoryLinkingCollectionsLinkCollectionOrder = typeof CategoryLinkingCollectionsLinkCollectionOrder[keyof typeof CategoryLinkingCollectionsLinkCollectionOrder];
export const CategoryLinkingCollectionsProjectCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  PlaceAsc: 'place_ASC',
  PlaceDesc: 'place_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC',
  YearAsc: 'year_ASC',
  YearDesc: 'year_DESC'
} as const;

export type CategoryLinkingCollectionsProjectCollectionOrder = typeof CategoryLinkingCollectionsProjectCollectionOrder[keyof typeof CategoryLinkingCollectionsProjectCollectionOrder];
export const CategoryLinkingCollectionsSeparatorCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type CategoryLinkingCollectionsSeparatorCollectionOrder = typeof CategoryLinkingCollectionsSeparatorCollectionOrder[keyof typeof CategoryLinkingCollectionsSeparatorCollectionOrder];
export const CategoryOrder = {
  ColorAsc: 'color_ASC',
  ColorDesc: 'color_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  ShowItemsInHomepageAsc: 'showItemsInHomepage_ASC',
  ShowItemsInHomepageDesc: 'showItemsInHomepage_DESC',
  ShowOnStartPageAsc: 'showOnStartPage_ASC',
  ShowOnStartPageDesc: 'showOnStartPage_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type CategoryOrder = typeof CategoryOrder[keyof typeof CategoryOrder];
/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersion = Entry & _Node & {
  __typename: 'ContentModelVersion';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  lastMigration?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ContentModelVersionLinkingCollections>;
  migrations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sys: Sys;
  updatedAt?: Maybe<Scalars['String']['output']>;
};


/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersionContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersionLastMigrationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersionMigrationsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersionUpdatedAtArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentModelVersionCollection = {
  __typename: 'ContentModelVersionCollection';
  items: Array<Maybe<ContentModelVersion>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentModelVersionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ContentModelVersionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ContentModelVersionFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  lastMigration?: InputMaybe<Scalars['String']['input']>;
  lastMigration_contains?: InputMaybe<Scalars['String']['input']>;
  lastMigration_exists?: InputMaybe<Scalars['Boolean']['input']>;
  lastMigration_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lastMigration_not?: InputMaybe<Scalars['String']['input']>;
  lastMigration_not_contains?: InputMaybe<Scalars['String']['input']>;
  lastMigration_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrations_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrations_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrations_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  migrations_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt_contains?: InputMaybe<Scalars['String']['input']>;
  updatedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedAt_not?: InputMaybe<Scalars['String']['input']>;
  updatedAt_not_contains?: InputMaybe<Scalars['String']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentModelVersionLinkingCollections = {
  __typename: 'ContentModelVersionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ContentModelVersionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const ContentModelVersionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  LastMigrationAsc: 'lastMigration_ASC',
  LastMigrationDesc: 'lastMigration_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  UpdatedAtAsc: 'updatedAt_ASC',
  UpdatedAtDesc: 'updatedAt_DESC'
} as const;

export type ContentModelVersionOrder = typeof ContentModelVersionOrder[keyof typeof ContentModelVersionOrder];
export type ContentfulMetadata = {
  __typename: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export const EntryOrder = {
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type EntryOrder = typeof EntryOrder[keyof typeof EntryOrder];
/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfig = Entry & _Node & {
  __typename: 'GeneralConfig';
  _id: Scalars['ID']['output'];
  activeColor?: Maybe<Scalars['String']['output']>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  detailsBackgroundColor?: Maybe<Scalars['String']['output']>;
  googleAnalyticsCode?: Maybe<Scalars['String']['output']>;
  hoverColor?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<GeneralConfigLinkingCollections>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoImage?: Maybe<Asset>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigActiveColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigDetailsBackgroundColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigGoogleAnalyticsCodeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigHoverColorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigSeoImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The general config of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/generalConfig) */
export type GeneralConfigSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GeneralConfigCollection = {
  __typename: 'GeneralConfigCollection';
  items: Array<Maybe<GeneralConfig>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GeneralConfigFilter = {
  AND?: InputMaybe<Array<InputMaybe<GeneralConfigFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GeneralConfigFilter>>>;
  activeColor?: InputMaybe<Scalars['String']['input']>;
  activeColor_contains?: InputMaybe<Scalars['String']['input']>;
  activeColor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  activeColor_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  activeColor_not?: InputMaybe<Scalars['String']['input']>;
  activeColor_not_contains?: InputMaybe<Scalars['String']['input']>;
  activeColor_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  detailsBackgroundColor?: InputMaybe<Scalars['String']['input']>;
  detailsBackgroundColor_contains?: InputMaybe<Scalars['String']['input']>;
  detailsBackgroundColor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  detailsBackgroundColor_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  detailsBackgroundColor_not?: InputMaybe<Scalars['String']['input']>;
  detailsBackgroundColor_not_contains?: InputMaybe<Scalars['String']['input']>;
  detailsBackgroundColor_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  googleAnalyticsCode?: InputMaybe<Scalars['String']['input']>;
  googleAnalyticsCode_contains?: InputMaybe<Scalars['String']['input']>;
  googleAnalyticsCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  googleAnalyticsCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  googleAnalyticsCode_not?: InputMaybe<Scalars['String']['input']>;
  googleAnalyticsCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  googleAnalyticsCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hoverColor?: InputMaybe<Scalars['String']['input']>;
  hoverColor_contains?: InputMaybe<Scalars['String']['input']>;
  hoverColor_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hoverColor_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hoverColor_not?: InputMaybe<Scalars['String']['input']>;
  hoverColor_not_contains?: InputMaybe<Scalars['String']['input']>;
  hoverColor_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type GeneralConfigLinkingCollections = {
  __typename: 'GeneralConfigLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type GeneralConfigLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const GeneralConfigOrder = {
  ActiveColorAsc: 'activeColor_ASC',
  ActiveColorDesc: 'activeColor_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  DetailsBackgroundColorAsc: 'detailsBackgroundColor_ASC',
  DetailsBackgroundColorDesc: 'detailsBackgroundColor_DESC',
  GoogleAnalyticsCodeAsc: 'googleAnalyticsCode_ASC',
  GoogleAnalyticsCodeDesc: 'googleAnalyticsCode_DESC',
  HoverColorAsc: 'hoverColor_ASC',
  HoverColorDesc: 'hoverColor_DESC',
  SeoTitleAsc: 'seoTitle_ASC',
  SeoTitleDesc: 'seoTitle_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type GeneralConfigOrder = typeof GeneralConfigOrder[keyof typeof GeneralConfigOrder];
/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type Homepage = Entry & _Node & {
  __typename: 'Homepage';
  _id: Scalars['ID']['output'];
  contentCollection?: Maybe<HomepageContentCollection>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<HomepageLinkingCollections>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoImage?: Maybe<Asset>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HomepageContentFilter>;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageSeoImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** The homepage of the website [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/homepage) */
export type HomepageSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HomepageCollection = {
  __typename: 'HomepageCollection';
  items: Array<Maybe<Homepage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HomepageContentCollection = {
  __typename: 'HomepageContentCollection';
  items: Array<Maybe<HomepageContentItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HomepageContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<HomepageContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HomepageContentFilter>>>;
  category_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type HomepageContentItem = Link | Project | Separator;

export type HomepageFilter = {
  AND?: InputMaybe<Array<InputMaybe<HomepageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HomepageFilter>>>;
  content?: InputMaybe<CfcontentMultiTypeNestedFilter>;
  contentCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type HomepageLinkingCollections = {
  __typename: 'HomepageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type HomepageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const HomepageOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SeoTitleAsc: 'seoTitle_ASC',
  SeoTitleDesc: 'seoTitle_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type HomepageOrder = typeof HomepageOrder[keyof typeof HomepageOrder];
/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type Image = Entry & _Node & {
  __typename: 'Image';
  _id: Scalars['ID']['output'];
  altText?: Maybe<Scalars['String']['output']>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ImageLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageAltTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type ImageTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImageCollection = {
  __typename: 'ImageCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  altText?: InputMaybe<Scalars['String']['input']>;
  altText_contains?: InputMaybe<Scalars['String']['input']>;
  altText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  altText_not?: InputMaybe<Scalars['String']['input']>;
  altText_not_contains?: InputMaybe<Scalars['String']['input']>;
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export const ImageFormat = {
  /** AVIF image format. */
  Avif: 'AVIF',
  /** JPG image format. */
  Jpg: 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive: 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png: 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8: 'PNG8',
  /** WebP image format. */
  Webp: 'WEBP'
} as const;

export type ImageFormat = typeof ImageFormat[keyof typeof ImageFormat];
export type ImageLinkingCollections = {
  __typename: 'ImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  imagesPanelCollection?: Maybe<ImagesPanelCollection>;
};


export type ImageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsImagesPanelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsImagesPanelCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const ImageLinkingCollectionsImagesPanelCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type ImageLinkingCollectionsImagesPanelCollectionOrder = typeof ImageLinkingCollectionsImagesPanelCollectionOrder[keyof typeof ImageLinkingCollectionsImagesPanelCollectionOrder];
export const ImageOrder = {
  AltTextAsc: 'altText_ASC',
  AltTextDesc: 'altText_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type ImageOrder = typeof ImageOrder[keyof typeof ImageOrder];
export const ImageResizeFocus = {
  /** Focus the resizing on the bottom. */
  Bottom: 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft: 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight: 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center: 'CENTER',
  /** Focus the resizing on the largest face. */
  Face: 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces: 'FACES',
  /** Focus the resizing on the left. */
  Left: 'LEFT',
  /** Focus the resizing on the right. */
  Right: 'RIGHT',
  /** Focus the resizing on the top. */
  Top: 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft: 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight: 'TOP_RIGHT'
} as const;

export type ImageResizeFocus = typeof ImageResizeFocus[keyof typeof ImageResizeFocus];
export const ImageResizeStrategy = {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop: 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill: 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit: 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad: 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale: 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb: 'THUMB'
} as const;

export type ImageResizeStrategy = typeof ImageResizeStrategy[keyof typeof ImageResizeStrategy];
export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanel = Entry & _Node & {
  __typename: 'ImagesPanel';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  imagesCollection?: Maybe<ImagesPanelImagesCollection>;
  linkedFrom?: Maybe<ImagesPanelLinkingCollections>;
  oldSlug?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImagesPanelImagesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelOldSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** An images panel is an entry that displays a list of images. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/imagesPanel) */
export type ImagesPanelTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImagesPanelCollection = {
  __typename: 'ImagesPanelCollection';
  items: Array<Maybe<ImagesPanel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ImagesPanelFilter = {
  AND?: InputMaybe<Array<InputMaybe<ImagesPanelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ImagesPanelFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  images?: InputMaybe<CfImageNestedFilter>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oldSlug?: InputMaybe<Scalars['String']['input']>;
  oldSlug_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oldSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oldSlug_not?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ImagesPanelImagesCollection = {
  __typename: 'ImagesPanelImagesCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export const ImagesPanelImagesCollectionOrder = {
  AltTextAsc: 'altText_ASC',
  AltTextDesc: 'altText_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type ImagesPanelImagesCollectionOrder = typeof ImagesPanelImagesCollectionOrder[keyof typeof ImagesPanelImagesCollectionOrder];
export type ImagesPanelLinkingCollections = {
  __typename: 'ImagesPanelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectRowCollection?: Maybe<ProjectRowCollection>;
};


export type ImagesPanelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImagesPanelLinkingCollectionsProjectRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImagesPanelLinkingCollectionsProjectRowCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const ImagesPanelLinkingCollectionsProjectRowCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type ImagesPanelLinkingCollectionsProjectRowCollectionOrder = typeof ImagesPanelLinkingCollectionsProjectRowCollectionOrder[keyof typeof ImagesPanelLinkingCollectionsProjectRowCollectionOrder];
export const ImagesPanelOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type ImagesPanelOrder = typeof ImagesPanelOrder[keyof typeof ImagesPanelOrder];
/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type Link = Entry & _Node & {
  __typename: 'Link';
  _id: Scalars['ID']['output'];
  category?: Maybe<Category>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  emailLink?: Maybe<Scalars['String']['output']>;
  externalLink?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LinkLinkingCollections>;
  pdfLink?: Maybe<Asset>;
  place?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkCategoryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CategoryFilter>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkEmailLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkExternalLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkPdfLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkPlaceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type LinkTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LinkCollection = {
  __typename: 'LinkCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  category?: InputMaybe<CfCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  emailLink?: InputMaybe<Scalars['String']['input']>;
  emailLink_contains?: InputMaybe<Scalars['String']['input']>;
  emailLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  emailLink_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  emailLink_not?: InputMaybe<Scalars['String']['input']>;
  emailLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  emailLink_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalLink?: InputMaybe<Scalars['String']['input']>;
  externalLink_contains?: InputMaybe<Scalars['String']['input']>;
  externalLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  externalLink_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalLink_not?: InputMaybe<Scalars['String']['input']>;
  externalLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  externalLink_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pdfLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  place_contains?: InputMaybe<Scalars['String']['input']>;
  place_exists?: InputMaybe<Scalars['Boolean']['input']>;
  place_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  place_not?: InputMaybe<Scalars['String']['input']>;
  place_not_contains?: InputMaybe<Scalars['String']['input']>;
  place_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LinkLinkingCollections = {
  __typename: 'LinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  homepageCollection?: Maybe<HomepageCollection>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionsHomepageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsHomepageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const LinkLinkingCollectionsHomepageCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SeoTitleAsc: 'seoTitle_ASC',
  SeoTitleDesc: 'seoTitle_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type LinkLinkingCollectionsHomepageCollectionOrder = typeof LinkLinkingCollectionsHomepageCollectionOrder[keyof typeof LinkLinkingCollectionsHomepageCollectionOrder];
export const LinkOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  EmailLinkAsc: 'emailLink_ASC',
  EmailLinkDesc: 'emailLink_DESC',
  ExternalLinkAsc: 'externalLink_ASC',
  ExternalLinkDesc: 'externalLink_DESC',
  PlaceAsc: 'place_ASC',
  PlaceDesc: 'place_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type LinkOrder = typeof LinkOrder[keyof typeof LinkOrder];
/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type Project = Entry & _Node & {
  __typename: 'Project';
  _id: Scalars['ID']['output'];
  category?: Maybe<Category>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProjectLinkingCollections>;
  oldSlug?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  projectRowsCollection?: Maybe<ProjectProjectRowsCollection>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectCategoryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CategoryFilter>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectOldSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectPlaceArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectProjectRowsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectProjectRowsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProjectRowFilter>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type ProjectYearArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectCollection = {
  __typename: 'ProjectCollection';
  items: Array<Maybe<Project>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  category?: InputMaybe<CfCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  oldSlug?: InputMaybe<Scalars['String']['input']>;
  oldSlug_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oldSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oldSlug_not?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  place?: InputMaybe<Scalars['String']['input']>;
  place_contains?: InputMaybe<Scalars['String']['input']>;
  place_exists?: InputMaybe<Scalars['Boolean']['input']>;
  place_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  place_not?: InputMaybe<Scalars['String']['input']>;
  place_not_contains?: InputMaybe<Scalars['String']['input']>;
  place_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  projectRows?: InputMaybe<CfProjectRowNestedFilter>;
  projectRowsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  year?: InputMaybe<Scalars['String']['input']>;
  year_contains?: InputMaybe<Scalars['String']['input']>;
  year_exists?: InputMaybe<Scalars['Boolean']['input']>;
  year_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  year_not?: InputMaybe<Scalars['String']['input']>;
  year_not_contains?: InputMaybe<Scalars['String']['input']>;
  year_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectLinkingCollections = {
  __typename: 'ProjectLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  homepageCollection?: Maybe<HomepageCollection>;
};


export type ProjectLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProjectLinkingCollectionsHomepageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectLinkingCollectionsHomepageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const ProjectLinkingCollectionsHomepageCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SeoTitleAsc: 'seoTitle_ASC',
  SeoTitleDesc: 'seoTitle_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type ProjectLinkingCollectionsHomepageCollectionOrder = typeof ProjectLinkingCollectionsHomepageCollectionOrder[keyof typeof ProjectLinkingCollectionsHomepageCollectionOrder];
export const ProjectOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  PlaceAsc: 'place_ASC',
  PlaceDesc: 'place_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC',
  YearAsc: 'year_ASC',
  YearDesc: 'year_DESC'
} as const;

export type ProjectOrder = typeof ProjectOrder[keyof typeof ProjectOrder];
export type ProjectProjectRowsCollection = {
  __typename: 'ProjectProjectRowsCollection';
  items: Array<Maybe<ProjectRow>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export const ProjectProjectRowsCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type ProjectProjectRowsCollectionOrder = typeof ProjectProjectRowsCollectionOrder[keyof typeof ProjectProjectRowsCollectionOrder];
/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRow = Entry & _Node & {
  __typename: 'ProjectRow';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProjectRowLinkingCollections>;
  rowCollection?: Maybe<ProjectRowRowCollection>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRowContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRowLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRowRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProjectRowRowFilter>;
};


/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRowTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectRowCollection = {
  __typename: 'ProjectRowCollection';
  items: Array<Maybe<ProjectRow>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectRowFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectRowFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectRowFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  row?: InputMaybe<CfrowMultiTypeNestedFilter>;
  rowCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectRowLinkingCollections = {
  __typename: 'ProjectRowLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectCollection?: Maybe<ProjectCollection>;
};


export type ProjectRowLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProjectRowLinkingCollectionsProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectRowLinkingCollectionsProjectCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const ProjectRowLinkingCollectionsProjectCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  PlaceAsc: 'place_ASC',
  PlaceDesc: 'place_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC',
  YearAsc: 'year_ASC',
  YearDesc: 'year_DESC'
} as const;

export type ProjectRowLinkingCollectionsProjectCollectionOrder = typeof ProjectRowLinkingCollectionsProjectCollectionOrder[keyof typeof ProjectRowLinkingCollectionsProjectCollectionOrder];
export const ProjectRowOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type ProjectRowOrder = typeof ProjectRowOrder[keyof typeof ProjectRowOrder];
export type ProjectRowRowCollection = {
  __typename: 'ProjectRowRowCollection';
  items: Array<Maybe<ProjectRowRowItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectRowRowFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectRowRowFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectRowRowFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type ProjectRowRowItem = ImagesPanel | TextPage | TextPanel | VideosPanel;

export type Query = {
  __typename: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  category?: Maybe<Category>;
  categoryCollection?: Maybe<CategoryCollection>;
  contentModelVersion?: Maybe<ContentModelVersion>;
  contentModelVersionCollection?: Maybe<ContentModelVersionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  generalConfig?: Maybe<GeneralConfig>;
  generalConfigCollection?: Maybe<GeneralConfigCollection>;
  homepage?: Maybe<Homepage>;
  homepageCollection?: Maybe<HomepageCollection>;
  image?: Maybe<Image>;
  imageCollection?: Maybe<ImageCollection>;
  imagesPanel?: Maybe<ImagesPanel>;
  imagesPanelCollection?: Maybe<ImagesPanelCollection>;
  link?: Maybe<Link>;
  linkCollection?: Maybe<LinkCollection>;
  project?: Maybe<Project>;
  projectCollection?: Maybe<ProjectCollection>;
  projectRow?: Maybe<ProjectRow>;
  projectRowCollection?: Maybe<ProjectRowCollection>;
  separator?: Maybe<Separator>;
  separatorCollection?: Maybe<SeparatorCollection>;
  textPage?: Maybe<TextPage>;
  textPageCollection?: Maybe<TextPageCollection>;
  textPanel?: Maybe<TextPanel>;
  textPanelCollection?: Maybe<TextPanelCollection>;
  video?: Maybe<Video>;
  videoCollection?: Maybe<VideoCollection>;
  videosPanel?: Maybe<VideosPanel>;
  videosPanelCollection?: Maybe<VideosPanelCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCategoryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CategoryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CategoryFilter>;
};


export type QueryContentModelVersionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryContentModelVersionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentModelVersionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentModelVersionFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryGeneralConfigArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGeneralConfigCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<GeneralConfigOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<GeneralConfigFilter>;
};


export type QueryHomepageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryHomepageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<HomepageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HomepageFilter>;
};


export type QueryImageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


export type QueryImagesPanelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryImagesPanelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImagesPanelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImagesPanelFilter>;
};


export type QueryLinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProjectFilter>;
};


export type QueryProjectRowArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ProjectRowOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ProjectRowFilter>;
};


export type QuerySeparatorArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeparatorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeparatorOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeparatorFilter>;
};


export type QueryTextPageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTextPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TextPageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TextPageFilter>;
};


export type QueryTextPanelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTextPanelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TextPanelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TextPanelFilter>;
};


export type QueryVideoArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryVideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};


export type QueryVideosPanelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryVideosPanelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideosPanelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideosPanelFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** A separator for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/separator) */
export type Separator = Entry & _Node & {
  __typename: 'Separator';
  _id: Scalars['ID']['output'];
  category?: Maybe<Category>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<SeparatorLinkingCollections>;
  sys: Sys;
};


/** A separator for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/separator) */
export type SeparatorCategoryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CategoryFilter>;
};


/** A separator for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/separator) */
export type SeparatorContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A separator for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/separator) */
export type SeparatorLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SeparatorCollection = {
  __typename: 'SeparatorCollection';
  items: Array<Maybe<Separator>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeparatorFilter = {
  AND?: InputMaybe<Array<InputMaybe<SeparatorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SeparatorFilter>>>;
  category?: InputMaybe<CfCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type SeparatorLinkingCollections = {
  __typename: 'SeparatorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  homepageCollection?: Maybe<HomepageCollection>;
};


export type SeparatorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeparatorLinkingCollectionsHomepageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeparatorLinkingCollectionsHomepageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const SeparatorLinkingCollectionsHomepageCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SeoTitleAsc: 'seoTitle_ASC',
  SeoTitleDesc: 'seoTitle_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type SeparatorLinkingCollectionsHomepageCollectionOrder = typeof SeparatorLinkingCollectionsHomepageCollectionOrder[keyof typeof SeparatorLinkingCollectionsHomepageCollectionOrder];
export const SeparatorOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type SeparatorOrder = typeof SeparatorOrder[keyof typeof SeparatorOrder];
export type Sys = {
  __typename: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPage = Entry & _Node & {
  __typename: 'TextPage';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TextPageLinkingCollections>;
  oldSlug?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  text?: Maybe<TextPageText>;
  title?: Maybe<Scalars['String']['output']>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageOldSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPageTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TextPageCollection = {
  __typename: 'TextPageCollection';
  items: Array<Maybe<TextPage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TextPageFilter = {
  AND?: InputMaybe<Array<InputMaybe<TextPageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TextPageFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  oldSlug?: InputMaybe<Scalars['String']['input']>;
  oldSlug_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oldSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oldSlug_not?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TextPageLinkingCollections = {
  __typename: 'TextPageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectRowCollection?: Maybe<ProjectRowCollection>;
};


export type TextPageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TextPageLinkingCollectionsProjectRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TextPageLinkingCollectionsProjectRowCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const TextPageLinkingCollectionsProjectRowCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type TextPageLinkingCollectionsProjectRowCollectionOrder = typeof TextPageLinkingCollectionsProjectRowCollectionOrder[keyof typeof TextPageLinkingCollectionsProjectRowCollectionOrder];
export const TextPageOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type TextPageOrder = typeof TextPageOrder[keyof typeof TextPageOrder];
export type TextPageText = {
  __typename: 'TextPageText';
  json: Scalars['JSON']['output'];
  links: TextPageTextLinks;
};

export type TextPageTextAssets = {
  __typename: 'TextPageTextAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TextPageTextEntries = {
  __typename: 'TextPageTextEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TextPageTextLinks = {
  __typename: 'TextPageTextLinks';
  assets: TextPageTextAssets;
  entries: TextPageTextEntries;
  resources: TextPageTextResources;
};

export type TextPageTextResources = {
  __typename: 'TextPageTextResources';
  block: Array<TextPageTextResourcesBlock>;
  hyperlink: Array<TextPageTextResourcesHyperlink>;
  inline: Array<TextPageTextResourcesInline>;
};

export type TextPageTextResourcesBlock = ResourceLink & {
  __typename: 'TextPageTextResourcesBlock';
  sys: ResourceSys;
};

export type TextPageTextResourcesHyperlink = ResourceLink & {
  __typename: 'TextPageTextResourcesHyperlink';
  sys: ResourceSys;
};

export type TextPageTextResourcesInline = ResourceLink & {
  __typename: 'TextPageTextResourcesInline';
  sys: ResourceSys;
};

/** A text panel is an entry that displays a text. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPanel) */
export type TextPanel = Entry & _Node & {
  __typename: 'TextPanel';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TextPanelLinkingCollections>;
  sys: Sys;
  text?: Maybe<TextPanelText>;
};


/** A text panel is an entry that displays a text. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPanel) */
export type TextPanelContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A text panel is an entry that displays a text. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPanel) */
export type TextPanelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A text panel is an entry that displays a text. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPanel) */
export type TextPanelTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TextPanelCollection = {
  __typename: 'TextPanelCollection';
  items: Array<Maybe<TextPanel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TextPanelFilter = {
  AND?: InputMaybe<Array<InputMaybe<TextPanelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TextPanelFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
};

export type TextPanelLinkingCollections = {
  __typename: 'TextPanelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectRowCollection?: Maybe<ProjectRowCollection>;
};


export type TextPanelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TextPanelLinkingCollectionsProjectRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TextPanelLinkingCollectionsProjectRowCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const TextPanelLinkingCollectionsProjectRowCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type TextPanelLinkingCollectionsProjectRowCollectionOrder = typeof TextPanelLinkingCollectionsProjectRowCollectionOrder[keyof typeof TextPanelLinkingCollectionsProjectRowCollectionOrder];
export const TextPanelOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC'
} as const;

export type TextPanelOrder = typeof TextPanelOrder[keyof typeof TextPanelOrder];
export type TextPanelText = {
  __typename: 'TextPanelText';
  json: Scalars['JSON']['output'];
  links: TextPanelTextLinks;
};

export type TextPanelTextAssets = {
  __typename: 'TextPanelTextAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TextPanelTextEntries = {
  __typename: 'TextPanelTextEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TextPanelTextLinks = {
  __typename: 'TextPanelTextLinks';
  assets: TextPanelTextAssets;
  entries: TextPanelTextEntries;
  resources: TextPanelTextResources;
};

export type TextPanelTextResources = {
  __typename: 'TextPanelTextResources';
  block: Array<TextPanelTextResourcesBlock>;
  hyperlink: Array<TextPanelTextResourcesHyperlink>;
  inline: Array<TextPanelTextResourcesInline>;
};

export type TextPanelTextResourcesBlock = ResourceLink & {
  __typename: 'TextPanelTextResourcesBlock';
  sys: ResourceSys;
};

export type TextPanelTextResourcesHyperlink = ResourceLink & {
  __typename: 'TextPanelTextResourcesHyperlink';
  sys: ResourceSys;
};

export type TextPanelTextResourcesInline = ResourceLink & {
  __typename: 'TextPanelTextResourcesInline';
  sys: ResourceSys;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type Video = Entry & _Node & {
  __typename: 'Video';
  _id: Scalars['ID']['output'];
  altText?: Maybe<Scalars['String']['output']>;
  autoStart?: Maybe<Scalars['Boolean']['output']>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<VideoLinkingCollections>;
  previewImage?: Maybe<Asset>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Asset>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoAltTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoAutoStartArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoPreviewImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoVideoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A video is an entry that to be added to a videos panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/video) */
export type VideoVideoUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoCollection = {
  __typename: 'VideoCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type VideoFilter = {
  AND?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  altText?: InputMaybe<Scalars['String']['input']>;
  altText_contains?: InputMaybe<Scalars['String']['input']>;
  altText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  altText_not?: InputMaybe<Scalars['String']['input']>;
  altText_not_contains?: InputMaybe<Scalars['String']['input']>;
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  autoStart?: InputMaybe<Scalars['Boolean']['input']>;
  autoStart_exists?: InputMaybe<Scalars['Boolean']['input']>;
  autoStart_not?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  previewImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  videoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  videoUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videoUrl_not?: InputMaybe<Scalars['String']['input']>;
  videoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  videoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  video_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoLinkingCollections = {
  __typename: 'VideoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  videosPanelCollection?: Maybe<VideosPanelCollection>;
};


export type VideoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoLinkingCollectionsVideosPanelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoLinkingCollectionsVideosPanelCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const VideoLinkingCollectionsVideosPanelCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type VideoLinkingCollectionsVideosPanelCollectionOrder = typeof VideoLinkingCollectionsVideosPanelCollectionOrder[keyof typeof VideoLinkingCollectionsVideosPanelCollectionOrder];
export const VideoOrder = {
  AltTextAsc: 'altText_ASC',
  AltTextDesc: 'altText_DESC',
  AutoStartAsc: 'autoStart_ASC',
  AutoStartDesc: 'autoStart_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  VideoUrlAsc: 'videoUrl_ASC',
  VideoUrlDesc: 'videoUrl_DESC'
} as const;

export type VideoOrder = typeof VideoOrder[keyof typeof VideoOrder];
/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanel = Entry & _Node & {
  __typename: 'VideosPanel';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<VideosPanelLinkingCollections>;
  oldSlug?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  videosCollection?: Maybe<VideosPanelVideosCollection>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelContentfulDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelOldSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanelVideosCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideosPanelVideosCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};

export type VideosPanelCollection = {
  __typename: 'VideosPanelCollection';
  items: Array<Maybe<VideosPanel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type VideosPanelFilter = {
  AND?: InputMaybe<Array<InputMaybe<VideosPanelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VideosPanelFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  oldSlug?: InputMaybe<Scalars['String']['input']>;
  oldSlug_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  oldSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  oldSlug_not?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  oldSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videos?: InputMaybe<CfVideoNestedFilter>;
  videosCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideosPanelLinkingCollections = {
  __typename: 'VideosPanelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectRowCollection?: Maybe<ProjectRowCollection>;
};


export type VideosPanelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideosPanelLinkingCollectionsProjectRowCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideosPanelLinkingCollectionsProjectRowCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export const VideosPanelLinkingCollectionsProjectRowCollectionOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type VideosPanelLinkingCollectionsProjectRowCollectionOrder = typeof VideosPanelLinkingCollectionsProjectRowCollectionOrder[keyof typeof VideosPanelLinkingCollectionsProjectRowCollectionOrder];
export const VideosPanelOrder = {
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  OldSlugAsc: 'oldSlug_ASC',
  OldSlugDesc: 'oldSlug_DESC',
  SlugAsc: 'slug_ASC',
  SlugDesc: 'slug_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  TitleAsc: 'title_ASC',
  TitleDesc: 'title_DESC'
} as const;

export type VideosPanelOrder = typeof VideosPanelOrder[keyof typeof VideosPanelOrder];
export type VideosPanelVideosCollection = {
  __typename: 'VideosPanelVideosCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export const VideosPanelVideosCollectionOrder = {
  AltTextAsc: 'altText_ASC',
  AltTextDesc: 'altText_DESC',
  AutoStartAsc: 'autoStart_ASC',
  AutoStartDesc: 'autoStart_DESC',
  ContentfulDescriptionAsc: 'contentfulDescription_ASC',
  ContentfulDescriptionDesc: 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc: 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc: 'sys_firstPublishedAt_DESC',
  SysIdAsc: 'sys_id_ASC',
  SysIdDesc: 'sys_id_DESC',
  SysPublishedAtAsc: 'sys_publishedAt_ASC',
  SysPublishedAtDesc: 'sys_publishedAt_DESC',
  SysPublishedVersionAsc: 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc: 'sys_publishedVersion_DESC',
  VideoUrlAsc: 'videoUrl_ASC',
  VideoUrlDesc: 'videoUrl_DESC'
} as const;

export type VideosPanelVideosCollectionOrder = typeof VideosPanelVideosCollectionOrder[keyof typeof VideosPanelVideosCollectionOrder];
export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfCategoryNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfCategoryNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfCategoryNestedFilter>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  showItemsInHomepage?: InputMaybe<Scalars['Boolean']['input']>;
  showItemsInHomepage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showItemsInHomepage_not?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showOnStartPage_not?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfImageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfImageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfImageNestedFilter>>>;
  altText?: InputMaybe<Scalars['String']['input']>;
  altText_contains?: InputMaybe<Scalars['String']['input']>;
  altText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  altText_not?: InputMaybe<Scalars['String']['input']>;
  altText_not_contains?: InputMaybe<Scalars['String']['input']>;
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfProjectRowNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfProjectRowNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfProjectRowNestedFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  rowCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfVideoNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfVideoNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfVideoNestedFilter>>>;
  altText?: InputMaybe<Scalars['String']['input']>;
  altText_contains?: InputMaybe<Scalars['String']['input']>;
  altText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  altText_not?: InputMaybe<Scalars['String']['input']>;
  altText_not_contains?: InputMaybe<Scalars['String']['input']>;
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  autoStart?: InputMaybe<Scalars['Boolean']['input']>;
  autoStart_exists?: InputMaybe<Scalars['Boolean']['input']>;
  autoStart_not?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  previewImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  videoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  videoUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  videoUrl_not?: InputMaybe<Scalars['String']['input']>;
  videoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  videoUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  video_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfcontentMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  category_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type CfrowMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfrowMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfrowMultiTypeNestedFilter>>>;
  contentfulDescription?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulDescription_not?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type GetGeneralConfigQueryVariables = Exact<{
  preview: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetGeneralConfigQuery = { __typename: 'Query', generalConfigCollection?: { __typename: 'GeneralConfigCollection', items: Array<{ __typename: 'GeneralConfig', activeColor?: string | null, detailsBackgroundColor?: string | null, googleAnalyticsCode?: string | null, hoverColor?: string | null, seoDescription?: string | null, seoTitle?: string | null, sys: { __typename: 'Sys', id: string }, seoImage?: { __typename: 'Asset', url?: string | null } | null } | null> } | null };

export type GetHeaderQueryVariables = Exact<{
  preview: Scalars['Boolean']['input'];
}>;


export type GetHeaderQuery = { __typename: 'Query', categoryCollection?: { __typename: 'CategoryCollection', items: Array<{ __typename: 'Category', slug?: string | null, title?: string | null, showOnStartPage?: boolean | null, showItemsInHomepage?: boolean | null, color?: string | null, sys: { __typename: 'Sys', id: string } } | null> } | null };

type ContentfulSysId_Category_Fragment = { __typename: 'Category', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_ContentModelVersion_Fragment = { __typename: 'ContentModelVersion', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_GeneralConfig_Fragment = { __typename: 'GeneralConfig', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Homepage_Fragment = { __typename: 'Homepage', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Image_Fragment = { __typename: 'Image', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_ImagesPanel_Fragment = { __typename: 'ImagesPanel', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Link_Fragment = { __typename: 'Link', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Project_Fragment = { __typename: 'Project', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_ProjectRow_Fragment = { __typename: 'ProjectRow', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Separator_Fragment = { __typename: 'Separator', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_TextPage_Fragment = { __typename: 'TextPage', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_TextPanel_Fragment = { __typename: 'TextPanel', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_Video_Fragment = { __typename: 'Video', sys: { __typename: 'Sys', id: string } };

type ContentfulSysId_VideosPanel_Fragment = { __typename: 'VideosPanel', sys: { __typename: 'Sys', id: string } };

export type ContentfulSysIdFragment = ContentfulSysId_Category_Fragment | ContentfulSysId_ContentModelVersion_Fragment | ContentfulSysId_GeneralConfig_Fragment | ContentfulSysId_Homepage_Fragment | ContentfulSysId_Image_Fragment | ContentfulSysId_ImagesPanel_Fragment | ContentfulSysId_Link_Fragment | ContentfulSysId_Project_Fragment | ContentfulSysId_ProjectRow_Fragment | ContentfulSysId_Separator_Fragment | ContentfulSysId_TextPage_Fragment | ContentfulSysId_TextPanel_Fragment | ContentfulSysId_Video_Fragment | ContentfulSysId_VideosPanel_Fragment;

export type SeoFragment = { __typename: 'Homepage', seoTitle?: string | null, seoDescription?: string | null, seoImage?: { __typename: 'Asset', url?: string | null } | null };

export type GetHomepageQueryQueryVariables = Exact<{
  preview: Scalars['Boolean']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetHomepageQueryQuery = { __typename: 'Query', homepageCollection?: { __typename: 'HomepageCollection', items: Array<{ __typename: 'Homepage', seoTitle?: string | null, seoDescription?: string | null, contentCollection?: { __typename: 'HomepageContentCollection', items: Array<{ __typename: 'Link', title?: string | null, emailLink?: string | null, externalLink?: string | null, pdfLink?: { __typename: 'Asset', url?: string | null } | null, category?: { __typename: 'Category', slug?: string | null, color?: string | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | { __typename: 'Project', title?: string | null, slug?: string | null, year?: string | null, place?: string | null, category?: { __typename: 'Category', slug?: string | null, color?: string | null, sys: { __typename: 'Sys', id: string } } | null, projectRowsCollection?: { __typename: 'ProjectProjectRowsCollection', total: number } | null, sys: { __typename: 'Sys', id: string } } | { __typename: 'Separator', category?: { __typename: 'Category', slug?: string | null, color?: string | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string }, seoImage?: { __typename: 'Asset', url?: string | null } | null } | null> } | null };

export type GetProjectPanelsQueryVariables = Exact<{
  preview: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
}>;


export type GetProjectPanelsQuery = { __typename: 'Query', projectCollection?: { __typename: 'ProjectCollection', items: Array<{ __typename: 'Project', category?: { __typename: 'Category', color?: string | null, sys: { __typename: 'Sys', id: string } } | null, projectRowsCollection?: { __typename: 'ProjectProjectRowsCollection', items: Array<{ __typename: 'ProjectRow', title?: string | null, rowCollection?: { __typename: 'ProjectRowRowCollection', items: Array<{ __typename: 'ImagesPanel', title?: string | null, slug?: string | null, imagesCollection?: { __typename: 'ImagesPanelImagesCollection', items: Array<{ __typename: 'Image', altText?: string | null, image?: { __typename: 'Asset', url?: string | null, width?: number | null, height?: number | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | { __typename: 'TextPage', title?: string | null, slug?: string | null, sys: { __typename: 'Sys', id: string } } | { __typename: 'TextPanel', text?: { __typename: 'TextPanelText', json: any } | null, sys: { __typename: 'Sys', id: string } } | { __typename: 'VideosPanel', title?: string | null, slug?: string | null, videosCollection?: { __typename: 'VideosPanelVideosCollection', items: Array<{ __typename: 'Video', altText?: string | null, previewImage?: { __typename: 'Asset', url?: string | null, width?: number | null, height?: number | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | null> } | null };

export type GetProjectPanelBySlugQueryVariables = Exact<{
  preview: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
}>;


export type GetProjectPanelBySlugQuery = { __typename: 'Query', imagesPanelCollection?: { __typename: 'ImagesPanelCollection', items: Array<{ __typename: 'ImagesPanel', title?: string | null, slug?: string | null, imagesCollection?: { __typename: 'ImagesPanelImagesCollection', items: Array<{ __typename: 'Image', title?: string | null, description?: string | null, altText?: string | null, image?: { __typename: 'Asset', url?: string | null, width?: number | null, height?: number | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, videosPanelCollection?: { __typename: 'VideosPanelCollection', items: Array<{ __typename: 'VideosPanel', title?: string | null, slug?: string | null, videosCollection?: { __typename: 'VideosPanelVideosCollection', items: Array<{ __typename: 'Video', title?: string | null, description?: string | null, videoUrl?: string | null, autoStart?: boolean | null, video?: { __typename: 'Asset', url?: string | null, sys: { __typename: 'Sys', id: string } } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, sys: { __typename: 'Sys', id: string } } | null> } | null, textPageCollection?: { __typename: 'TextPageCollection', items: Array<{ __typename: 'TextPage', title?: string | null, slug?: string | null, text?: { __typename: 'TextPageText', json: any } | null, sys: { __typename: 'Sys', id: string } } | null> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ContentfulSysIdFragmentDoc = new TypedDocumentString(`
    fragment ContentfulSysId on Entry {
  sys {
    id
  }
}
    `, {"fragmentName":"ContentfulSysId"}) as unknown as TypedDocumentString<ContentfulSysIdFragment, unknown>;
export const SeoFragmentDoc = new TypedDocumentString(`
    fragment Seo on Homepage {
  seoTitle
  seoDescription
  seoImage {
    url
  }
}
    `, {"fragmentName":"Seo"}) as unknown as TypedDocumentString<SeoFragment, unknown>;
export const GetGeneralConfigDocument = new TypedDocumentString(`
    query getGeneralConfig($preview: Boolean!, $limit: Int = 1) {
  generalConfigCollection(preview: $preview, limit: $limit) {
    items {
      sys {
        id
      }
      activeColor
      detailsBackgroundColor
      googleAnalyticsCode
      hoverColor
      seoDescription
      seoImage {
        url
      }
      seoTitle
    }
  }
}
    `) as unknown as TypedDocumentString<GetGeneralConfigQuery, GetGeneralConfigQueryVariables>;
export const GetHeaderDocument = new TypedDocumentString(`
    query getHeader($preview: Boolean!) {
  categoryCollection(preview: $preview) {
    items {
      sys {
        id
      }
      slug
      title
      showOnStartPage
      showItemsInHomepage
      color
    }
  }
}
    `) as unknown as TypedDocumentString<GetHeaderQuery, GetHeaderQueryVariables>;
export const GetHomepageQueryDocument = new TypedDocumentString(`
    query getHomepageQuery($preview: Boolean!, $limit: Int = 1) {
  homepageCollection(preview: $preview, limit: $limit) {
    items {
      ...ContentfulSysId
      ...Seo
      contentCollection(preview: $preview) {
        items {
          ... on Link {
            __typename
            ...ContentfulSysId
            title
            emailLink
            externalLink
            pdfLink {
              url
            }
            category {
              ...ContentfulSysId
              slug
              color
            }
          }
          ... on Project {
            __typename
            ...ContentfulSysId
            title
            slug
            year
            place
            category {
              ...ContentfulSysId
              slug
              color
            }
            projectRowsCollection(preview: $preview, limit: 0) {
              total
            }
          }
          ... on Separator {
            __typename
            ...ContentfulSysId
            category {
              ...ContentfulSysId
              slug
              color
            }
          }
        }
      }
    }
  }
}
    fragment ContentfulSysId on Entry {
  sys {
    id
  }
}
fragment Seo on Homepage {
  seoTitle
  seoDescription
  seoImage {
    url
  }
}`) as unknown as TypedDocumentString<GetHomepageQueryQuery, GetHomepageQueryQueryVariables>;
export const GetProjectPanelsDocument = new TypedDocumentString(`
    query GetProjectPanels($preview: Boolean!, $slug: String!) {
  projectCollection(preview: $preview, where: {slug: $slug}, limit: 1) {
    items {
      ...ContentfulSysId
      category {
        ...ContentfulSysId
        color
      }
      projectRowsCollection(preview: $preview, limit: 8) {
        items {
          ...ContentfulSysId
          title
          rowCollection(preview: $preview, limit: 8) {
            items {
              __typename
              ... on ImagesPanel {
                ...ContentfulSysId
                title
                slug
                imagesCollection(preview: $preview, limit: 30) {
                  items {
                    ...ContentfulSysId
                    __typename
                    altText
                    image {
                      sys {
                        id
                      }
                      url(transform: {height: 50, format: WEBP})
                      width
                      height
                    }
                  }
                }
              }
              ... on VideosPanel {
                ...ContentfulSysId
                title
                slug
                videosCollection(preview: $preview, limit: 15) {
                  items {
                    ...ContentfulSysId
                    __typename
                    altText
                    previewImage {
                      sys {
                        id
                      }
                      url(transform: {height: 50, format: WEBP})
                      width
                      height
                    }
                  }
                }
              }
              ... on TextPanel {
                ...ContentfulSysId
                __typename
                text {
                  json
                }
              }
              ... on TextPage {
                ...ContentfulSysId
                __typename
                title
                slug
              }
            }
          }
        }
      }
    }
  }
}
    fragment ContentfulSysId on Entry {
  sys {
    id
  }
}`) as unknown as TypedDocumentString<GetProjectPanelsQuery, GetProjectPanelsQueryVariables>;
export const GetProjectPanelBySlugDocument = new TypedDocumentString(`
    query GetProjectPanelBySlug($preview: Boolean!, $slug: String!) {
  imagesPanelCollection(preview: $preview, where: {slug: $slug}, limit: 1) {
    items {
      __typename
      ... on ImagesPanel {
        ...ContentfulSysId
        title
        slug
        imagesCollection(preview: $preview, limit: 30) {
          items {
            ...ContentfulSysId
            __typename
            title
            description
            altText
            image {
              sys {
                id
              }
              url
              width
              height
            }
          }
        }
      }
    }
  }
  videosPanelCollection(preview: $preview, where: {slug: $slug}, limit: 1) {
    items {
      __typename
      ... on VideosPanel {
        ...ContentfulSysId
        title
        slug
        videosCollection(preview: $preview, limit: 30) {
          items {
            ...ContentfulSysId
            __typename
            title
            video {
              sys {
                id
              }
              url
            }
            description
            videoUrl
            autoStart
          }
        }
      }
    }
  }
  textPageCollection(preview: $preview, where: {slug: $slug}, limit: 1) {
    items {
      __typename
      ... on TextPage {
        ...ContentfulSysId
        title
        slug
        text {
          json
        }
      }
    }
  }
}
    fragment ContentfulSysId on Entry {
  sys {
    id
  }
}`) as unknown as TypedDocumentString<GetProjectPanelBySlugQuery, GetProjectPanelBySlugQueryVariables>;