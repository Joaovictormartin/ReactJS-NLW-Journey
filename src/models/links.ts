export type LinksGet = {
  id: string;
  title: string;
  url: string;
};

export type LinksPost = {
  url: string;
  title: string;
  tripId?: string;
};
