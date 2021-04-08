export interface NewsSource1 {
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

export interface NewsSource2 {
  news_url?: string;
  image_url?: string;
  title?: string;
  text?: string;
  source_name?: string;
  date?: any;
  topics?: any[];
  sentiment?: string;
  type?: string;
  tickers: string[];
}
