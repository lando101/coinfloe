export interface News {
  id?: any;
  guid?: string;
  published_on?: number;
  imageurl?: string;
  title?: string;
  url?: string;
  source?: string;
  body?: string;
  tags?: string;
  categories?: string;
  upvotes?: number;
  downvotes?: number;
  lang?: string;
  source_info?: Source;
}

export interface Source {
  name?: string;
  lang?: string;
  img?: string;
}
