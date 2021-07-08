// export interface CoinInfoExpanded {
//   data?: Data
// }

// export interface Data {
//   status?: Status
//   data?: Data2
// }

// export interface Status {
//   timestamp?: string
//   error_code?: number
//   error_message?: any
//   elapsed?: number
//   credit_count?: number
//   notice?: any
// }

// export interface CoinInfoExpanded {
//   coinInfo?: Alpha
// }

export interface CoinInfoExpanded {
  id?: number;
  name?: string;
  symbol?: string;
  category?: string;
  description?: string;
  slug?: string;
  logo?: string;
  subreddit?: string;
  notice?: string;
  tags?: string[];
  'tag-names'?: string[];
  'tag-groups'?: string[];
  urls?: Urls;
  platform?: Platform;
  date_added?: string;
  twitter_username?: string;
  is_hidden?: number;
}

export interface Urls {
  website?: string[];
  twitter?: string[];
  message_board?: string[];
  chat?: string[];
  explorer?: string[];
  reddit?: any[];
  technical_doc?: string[];
  source_code?: string[];
  announcement?: string[];
}

export interface Platform {
  id?: number;
  name?: string;
  symbol?: string;
  slug?: string;
  token_address?: string;
}
