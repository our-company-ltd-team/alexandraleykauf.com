export type Category = {
  color: string | undefined;
  id: string;
  showOnStartPage: boolean;
  showItemsInHomepage: boolean;
  slug: string;
  title: string;
};

export type HeaderData = {
  categories: Array<Category>;
};
