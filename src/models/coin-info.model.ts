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

export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: null;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: null;
  additional_notices: any[];
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  ico_data: IcoData;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: PublicInterestStats;
  status_updates: any[];
  last_updated: Date;
}

export interface CommunityData {
  facebook_likes: any;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: any;
}

export interface Description {
  en: string;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

export interface CodeAdditionsDeletions4_Weeks {
  additions: number;
  deletions: number;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
}

export interface ReposURL {
  github: string[];
  bitbucket: any[];
}

export interface IcoData {
  ico_start_date: Date;
  ico_end_date: Date;
  short_desc: string;
  description: null;
  // links: IcoDataLinks;
  softcap_currency: string;
  hardcap_currency: string;
  total_raised_currency: string;
  softcap_amount: null;
  hardcap_amount: string;
  total_raised: null;
  quote_pre_sale_currency: string;
  base_pre_sale_amount: string;
  quote_pre_sale_amount: string;
  quote_public_sale_currency: string;
  base_public_sale_amount: number;
  quote_public_sale_amount: number;
  accepting_currencies: string;
  country_origin: string;
  pre_sale_start_date: null;
  pre_sale_end_date: null;
  whitelist_url: string;
  whitelist_start_date: null;
  whitelist_end_date: null;
  bounty_detail_url: string;
  amount_for_sale: null;
  kyc_required: boolean;
  whitelist_available: null;
  pre_sale_available: null;
  pre_sale_ended: boolean;
}
export interface MarketData {
  current_price: { [key: string]: number };
  total_value_locked: null;
  mcap_to_tvl_ratio: null;
  fdv_to_tvl_ratio: null;
  roi: null;
  ath: { [key: string]: number };
  ath_change_percentage: { [key: string]: number };
  ath_date: { [key: string]: Date };
  atl: { [key: string]: number };
  atl_change_percentage: { [key: string]: number };
  atl_date: { [key: string]: Date };
  market_cap: { [key: string]: number };
  market_cap_rank: number;
  fully_diluted_valuation: { [key: string]: number };
  total_volume: { [key: string]: number };
  high_24h: { [key: string]: number };
  low_24h: { [key: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: { [key: string]: number };
  price_change_percentage_1h_in_currency: { [key: string]: number };
  price_change_percentage_24h_in_currency: { [key: string]: number };
  price_change_percentage_7d_in_currency: { [key: string]: number };
  price_change_percentage_14d_in_currency: { [key: string]: number };
  price_change_percentage_30d_in_currency: { [key: string]: number };
  price_change_percentage_60d_in_currency: { [key: string]: number };
  price_change_percentage_200d_in_currency: { [key: string]: number };
  price_change_percentage_1y_in_currency: { [key: string]: number };
  market_cap_change_24h_in_currency: { [key: string]: number };
  market_cap_change_percentage_24h_in_currency: { [key: string]: number };
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: Date;
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: null;
}

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
