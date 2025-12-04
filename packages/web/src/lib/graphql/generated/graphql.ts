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
  __typename?: 'Asset';
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
  __typename?: 'AssetCollection';
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
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
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

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** A category for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/category) */
export type Category = Entry & _Node & {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  color?: Maybe<Scalars['String']['output']>;
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<CategoryLinkingCollections>;
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
  __typename?: 'CategoryCollection';
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
  __typename?: 'CategoryLinkingCollections';
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

export enum CategoryLinkingCollectionsLinkCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  EmailLinkAsc = 'emailLink_ASC',
  EmailLinkDesc = 'emailLink_DESC',
  ExternalLinkAsc = 'externalLink_ASC',
  ExternalLinkDesc = 'externalLink_DESC',
  PlaceAsc = 'place_ASC',
  PlaceDesc = 'place_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum CategoryLinkingCollectionsProjectCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  PlaceAsc = 'place_ASC',
  PlaceDesc = 'place_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC'
}

export enum CategoryLinkingCollectionsSeparatorCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum CategoryOrder {
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  ShowOnStartPageAsc = 'showOnStartPage_ASC',
  ShowOnStartPageDesc = 'showOnStartPage_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Tracks the version of the content model and applied migrations [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/contentModelVersion) */
export type ContentModelVersion = Entry & _Node & {
  __typename?: 'ContentModelVersion';
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
  __typename?: 'ContentModelVersionCollection';
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
  __typename?: 'ContentModelVersionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ContentModelVersionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentModelVersionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  LastMigrationAsc = 'lastMigration_ASC',
  LastMigrationDesc = 'lastMigration_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
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
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
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

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** An image is an entry that to be added to an images panel. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/image) */
export type Image = Entry & _Node & {
  __typename?: 'Image';
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
  __typename?: 'ImageCollection';
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

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export type ImageLinkingCollections = {
  __typename?: 'ImageLinkingCollections';
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

export enum ImageLinkingCollectionsImagesPanelCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageOrder {
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

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
  __typename?: 'ImagesPanel';
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
  __typename?: 'ImagesPanelCollection';
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
  __typename?: 'ImagesPanelImagesCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ImagesPanelImagesCollectionOrder {
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ImagesPanelLinkingCollections = {
  __typename?: 'ImagesPanelLinkingCollections';
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

export enum ImagesPanelLinkingCollectionsProjectRowCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImagesPanelOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** A link is an entry that allows to create a link for several purposes. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/link) */
export type Link = Entry & _Node & {
  __typename?: 'Link';
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
  __typename?: 'LinkCollection';
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
  __typename?: 'LinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LinkOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  EmailLinkAsc = 'emailLink_ASC',
  EmailLinkDesc = 'emailLink_DESC',
  ExternalLinkAsc = 'externalLink_ASC',
  ExternalLinkDesc = 'externalLink_DESC',
  PlaceAsc = 'place_ASC',
  PlaceDesc = 'place_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** A project is an entry that represents a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/project) */
export type Project = Entry & _Node & {
  __typename?: 'Project';
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
  __typename?: 'ProjectCollection';
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
  __typename?: 'ProjectLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ProjectLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ProjectOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  PlaceAsc = 'place_ASC',
  PlaceDesc = 'place_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC'
}

export type ProjectProjectRowsCollection = {
  __typename?: 'ProjectProjectRowsCollection';
  items: Array<Maybe<ProjectRow>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ProjectProjectRowsCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A project row is organizational entry to gather project panels. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/projectRow) */
export type ProjectRow = Entry & _Node & {
  __typename?: 'ProjectRow';
  _id: Scalars['ID']['output'];
  contentfulDescription?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProjectRowLinkingCollections>;
  rowCollection?: Maybe<ProjectRowRowCollection>;
  sys: Sys;
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

export type ProjectRowCollection = {
  __typename?: 'ProjectRowCollection';
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
};

export type ProjectRowLinkingCollections = {
  __typename?: 'ProjectRowLinkingCollections';
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

export enum ProjectRowLinkingCollectionsProjectCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  PlaceAsc = 'place_ASC',
  PlaceDesc = 'place_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC'
}

export enum ProjectRowOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ProjectRowRowCollection = {
  __typename?: 'ProjectRowRowCollection';
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
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  category?: Maybe<Category>;
  categoryCollection?: Maybe<CategoryCollection>;
  contentModelVersion?: Maybe<ContentModelVersion>;
  contentModelVersionCollection?: Maybe<ContentModelVersionCollection>;
  entryCollection?: Maybe<EntryCollection>;
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
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** A separator for projects [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/separator) */
export type Separator = Entry & _Node & {
  __typename?: 'Separator';
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
  __typename?: 'SeparatorCollection';
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
  __typename?: 'SeparatorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type SeparatorLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SeparatorOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Sys = {
  __typename?: 'Sys';
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
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

/** A text page is an entry that allows to create a text page for a project. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPage) */
export type TextPage = Entry & _Node & {
  __typename?: 'TextPage';
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
  __typename?: 'TextPageCollection';
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
  __typename?: 'TextPageLinkingCollections';
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

export enum TextPageLinkingCollectionsProjectRowCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum TextPageOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type TextPageText = {
  __typename?: 'TextPageText';
  json: Scalars['JSON']['output'];
  links: TextPageTextLinks;
};

export type TextPageTextAssets = {
  __typename?: 'TextPageTextAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TextPageTextEntries = {
  __typename?: 'TextPageTextEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TextPageTextLinks = {
  __typename?: 'TextPageTextLinks';
  assets: TextPageTextAssets;
  entries: TextPageTextEntries;
  resources: TextPageTextResources;
};

export type TextPageTextResources = {
  __typename?: 'TextPageTextResources';
  block: Array<TextPageTextResourcesBlock>;
  hyperlink: Array<TextPageTextResourcesHyperlink>;
  inline: Array<TextPageTextResourcesInline>;
};

export type TextPageTextResourcesBlock = ResourceLink & {
  __typename?: 'TextPageTextResourcesBlock';
  sys: ResourceSys;
};

export type TextPageTextResourcesHyperlink = ResourceLink & {
  __typename?: 'TextPageTextResourcesHyperlink';
  sys: ResourceSys;
};

export type TextPageTextResourcesInline = ResourceLink & {
  __typename?: 'TextPageTextResourcesInline';
  sys: ResourceSys;
};

/** A text panel is an entry that displays a text. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/textPanel) */
export type TextPanel = Entry & _Node & {
  __typename?: 'TextPanel';
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
  __typename?: 'TextPanelCollection';
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
  __typename?: 'TextPanelLinkingCollections';
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

export enum TextPanelLinkingCollectionsProjectRowCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum TextPanelOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type TextPanelText = {
  __typename?: 'TextPanelText';
  json: Scalars['JSON']['output'];
  links: TextPanelTextLinks;
};

export type TextPanelTextAssets = {
  __typename?: 'TextPanelTextAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TextPanelTextEntries = {
  __typename?: 'TextPanelTextEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TextPanelTextLinks = {
  __typename?: 'TextPanelTextLinks';
  assets: TextPanelTextAssets;
  entries: TextPanelTextEntries;
  resources: TextPanelTextResources;
};

export type TextPanelTextResources = {
  __typename?: 'TextPanelTextResources';
  block: Array<TextPanelTextResourcesBlock>;
  hyperlink: Array<TextPanelTextResourcesHyperlink>;
  inline: Array<TextPanelTextResourcesInline>;
};

export type TextPanelTextResourcesBlock = ResourceLink & {
  __typename?: 'TextPanelTextResourcesBlock';
  sys: ResourceSys;
};

export type TextPanelTextResourcesHyperlink = ResourceLink & {
  __typename?: 'TextPanelTextResourcesHyperlink';
  sys: ResourceSys;
};

export type TextPanelTextResourcesInline = ResourceLink & {
  __typename?: 'TextPanelTextResourcesInline';
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
  __typename?: 'Video';
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
  __typename?: 'VideoCollection';
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
  __typename?: 'VideoLinkingCollections';
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

export enum VideoLinkingCollectionsVideosPanelCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum VideoOrder {
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  AutoStartAsc = 'autoStart_ASC',
  AutoStartDesc = 'autoStart_DESC',
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  VideoUrlAsc = 'videoUrl_ASC',
  VideoUrlDesc = 'videoUrl_DESC'
}

/** A videos panel is an entry that displays a list of videos. [See type definition](https://app.contentful.com/spaces/melrjm7oll9m/content_types/videosPanel) */
export type VideosPanel = Entry & _Node & {
  __typename?: 'VideosPanel';
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
  __typename?: 'VideosPanelCollection';
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
  __typename?: 'VideosPanelLinkingCollections';
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

export enum VideosPanelLinkingCollectionsProjectRowCollectionOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum VideosPanelOrder {
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  OldSlugAsc = 'oldSlug_ASC',
  OldSlugDesc = 'oldSlug_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type VideosPanelVideosCollection = {
  __typename?: 'VideosPanelVideosCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum VideosPanelVideosCollectionOrder {
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  AutoStartAsc = 'autoStart_ASC',
  AutoStartDesc = 'autoStart_DESC',
  ContentfulDescriptionAsc = 'contentfulDescription_ASC',
  ContentfulDescriptionDesc = 'contentfulDescription_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  VideoUrlAsc = 'videoUrl_ASC',
  VideoUrlDesc = 'videoUrl_DESC'
}

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

export type GetHomePageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageDataQuery = { __typename?: 'Query', projectCollection?: { __typename?: 'ProjectCollection', items: Array<{ __typename?: 'Project', title?: string | null, slug?: string | null, year?: string | null, place?: string | null, sys: { __typename?: 'Sys', id: string }, category?: { __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null, linkCollection?: { __typename?: 'LinkCollection', items: Array<{ __typename?: 'Link', title?: string | null, place?: string | null, externalLink?: string | null, emailLink?: string | null, sys: { __typename?: 'Sys', id: string }, category?: { __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null, pdfLink?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null, separatorCollection?: { __typename?: 'SeparatorCollection', items: Array<{ __typename?: 'Separator', sys: { __typename?: 'Sys', id: string }, category?: { __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null, categoryCollection?: { __typename?: 'CategoryCollection', items: Array<{ __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetProjectsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsListQuery = { __typename?: 'Query', projectCollection?: { __typename?: 'ProjectCollection', items: Array<{ __typename?: 'Project', title?: string | null, slug?: string | null, year?: string | null, place?: string | null, sys: { __typename?: 'Sys', id: string }, category?: { __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null };

export type GetProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProjectBySlugQuery = { __typename?: 'Query', projectCollection?: { __typename?: 'ProjectCollection', items: Array<{ __typename?: 'Project', title?: string | null, slug?: string | null, year?: string | null, place?: string | null, sys: { __typename?: 'Sys', id: string }, category?: { __typename?: 'Category', title?: string | null, slug?: string | null, showOnStartPage?: boolean | null, color?: string | null, sys: { __typename?: 'Sys', id: string } } | null, projectRowsCollection?: { __typename?: 'ProjectProjectRowsCollection', items: Array<{ __typename?: 'ProjectRow', sys: { __typename?: 'Sys', id: string }, rowCollection?: { __typename?: 'ProjectRowRowCollection', items: Array<{ __typename: 'ImagesPanel', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ImagesPanelImagesCollection', items: Array<{ __typename?: 'Image', title?: string | null, description?: string | null, altText?: string | null, sys: { __typename?: 'Sys', id: string }, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, description?: string | null, width?: number | null, height?: number | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | { __typename: 'TextPage', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, text?: { __typename?: 'TextPageText', json: any } | null } | { __typename: 'TextPanel', sys: { __typename?: 'Sys', id: string }, text?: { __typename?: 'TextPanelText', json: any } | null } | { __typename: 'VideosPanel', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, videosCollection?: { __typename?: 'VideosPanelVideosCollection', items: Array<{ __typename?: 'Video', title?: string | null, description?: string | null, altText?: string | null, videoUrl?: string | null, autoStart?: boolean | null, sys: { __typename?: 'Sys', id: string }, previewImage?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null, sys: { __typename?: 'Sys', id: string } } | null, video?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null } | null> } | null } | null> } | null } | null> } | null };

export type GetProjectPanelsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProjectPanelsQuery = { __typename?: 'Query', projectCollection?: { __typename?: 'ProjectCollection', items: Array<{ __typename?: 'Project', projectRowsCollection?: { __typename?: 'ProjectProjectRowsCollection', items: Array<{ __typename?: 'ProjectRow', sys: { __typename?: 'Sys', id: string }, rowCollection?: { __typename?: 'ProjectRowRowCollection', items: Array<{ __typename: 'ImagesPanel', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, imagesCollection?: { __typename?: 'ImagesPanelImagesCollection', items: Array<{ __typename?: 'Image', title?: string | null, description?: string | null, altText?: string | null, sys: { __typename?: 'Sys', id: string }, image?: { __typename?: 'Asset', url?: string | null, title?: string | null, description?: string | null, width?: number | null, height?: number | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | { __typename: 'TextPage', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, text?: { __typename?: 'TextPageText', json: any } | null } | { __typename: 'TextPanel', sys: { __typename?: 'Sys', id: string }, text?: { __typename?: 'TextPanelText', json: any } | null } | { __typename: 'VideosPanel', title?: string | null, slug?: string | null, sys: { __typename?: 'Sys', id: string }, videosCollection?: { __typename?: 'VideosPanelVideosCollection', items: Array<{ __typename?: 'Video', title?: string | null, description?: string | null, altText?: string | null, videoUrl?: string | null, autoStart?: boolean | null, sys: { __typename?: 'Sys', id: string }, previewImage?: { __typename?: 'Asset', url?: string | null, title?: string | null, width?: number | null, height?: number | null, sys: { __typename?: 'Sys', id: string } } | null, video?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null } | null> } | null } | null> } | null } | null> } | null };

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

export const GetHomePageDataDocument = new TypedDocumentString(`
    query GetHomePageData {
  projectCollection(order: year_DESC, limit: 10) {
    items {
      sys {
        id
      }
      title
      slug
      year
      place
      category {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
    }
  }
  linkCollection {
    items {
      sys {
        id
      }
      title
      place
      category {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
      externalLink
      emailLink
      pdfLink {
        url
      }
    }
  }
  separatorCollection {
    items {
      sys {
        id
      }
      category {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
    }
  }
  categoryCollection {
    items {
      sys {
        id
      }
      title
      slug
      showOnStartPage
      color
    }
  }
}
    `) as unknown as TypedDocumentString<GetHomePageDataQuery, GetHomePageDataQueryVariables>;
export const GetProjectsListDocument = new TypedDocumentString(`
    query GetProjectsList {
  projectCollection(order: sys_firstPublishedAt_DESC) {
    items {
      sys {
        id
      }
      title
      slug
      year
      place
      category {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProjectsListQuery, GetProjectsListQueryVariables>;
export const GetProjectBySlugDocument = new TypedDocumentString(`
    query GetProjectBySlug($slug: String!) {
  projectCollection(where: {slug: $slug}, limit: 1) {
    items {
      sys {
        id
      }
      title
      slug
      year
      place
      category {
        sys {
          id
        }
        title
        slug
        showOnStartPage
        color
      }
      projectRowsCollection {
        items {
          sys {
            id
          }
          rowCollection {
            items {
              __typename
              ... on ImagesPanel {
                sys {
                  id
                }
                title
                slug
                imagesCollection {
                  items {
                    sys {
                      id
                    }
                    title
                    description
                    altText
                    image {
                      sys {
                        id
                      }
                      url
                      title
                      description
                      width
                      height
                    }
                  }
                }
              }
              ... on VideosPanel {
                sys {
                  id
                }
                title
                slug
                videosCollection {
                  items {
                    sys {
                      id
                    }
                    title
                    description
                    altText
                    previewImage {
                      sys {
                        id
                      }
                      url
                      title
                      width
                      height
                    }
                    video {
                      url
                    }
                    videoUrl
                    autoStart
                  }
                }
              }
              ... on TextPanel {
                sys {
                  id
                }
                text {
                  json
                }
              }
              ... on TextPage {
                sys {
                  id
                }
                title
                slug
                text {
                  json
                }
              }
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>;
export const GetProjectPanelsDocument = new TypedDocumentString(`
    query GetProjectPanels($slug: String!) {
  projectCollection(where: {slug: $slug}, limit: 1) {
    items {
      projectRowsCollection {
        items {
          sys {
            id
          }
          rowCollection {
            items {
              __typename
              ... on ImagesPanel {
                sys {
                  id
                }
                title
                slug
                imagesCollection {
                  items {
                    sys {
                      id
                    }
                    title
                    description
                    altText
                    image {
                      sys {
                        id
                      }
                      url
                      title
                      description
                      width
                      height
                    }
                  }
                }
              }
              ... on VideosPanel {
                sys {
                  id
                }
                title
                slug
                videosCollection {
                  items {
                    sys {
                      id
                    }
                    title
                    description
                    altText
                    previewImage {
                      sys {
                        id
                      }
                      url
                      title
                      width
                      height
                    }
                    video {
                      url
                    }
                    videoUrl
                    autoStart
                  }
                }
              }
              ... on TextPanel {
                sys {
                  id
                }
                text {
                  json
                }
              }
              ... on TextPage {
                sys {
                  id
                }
                title
                slug
                text {
                  json
                }
              }
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProjectPanelsQuery, GetProjectPanelsQueryVariables>;