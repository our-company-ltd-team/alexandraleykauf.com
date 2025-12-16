export type Category = {
  typename: string;
  color?: string;
  id: string;
  showOnStartPage: boolean;
  showItemsInHomepage: boolean;
  slug: string;
  title: string;
};

export type HeaderData = {
  categories: Array<Category>;
};
