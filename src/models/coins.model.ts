export interface CoinCG {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: null;
  last_updated: Date;
  price_change_percentage_1y_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export interface TrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface Coin {
  CoinInfo?: CoinInfo;
  RAW?: RAW;
  DISPLAY?: DISPLAY;
  FAVORITE?: boolean;
}
export interface CoinInfo {
  Id: string;
  Name: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
  Url: string;
  Algorithm: string;
  ProofType: string;
  Rating: Rating;
  NetHashesPerSecond: number;
  BlockNumber: number;
  BlockTime: number;
  BlockReward: number;
  AssetLaunchDate: string;
  MaxSupply: number;
  Type: number;
  DocumentType: string;
}
export interface Rating {
  Weiss: Weiss;
}
export interface Weiss {
  Rating: string;
  TechnologyAdoptionRating: string;
  MarketPerformanceRating: string;
}
export interface RAW {
  USD: USD;
}
export interface USD {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: string;
  PRICE: number;
  LASTUPDATE: number;
  MEDIAN: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  LASTTRADEID: string;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  OPENDAY: number;
  HIGHDAY: number;
  LOWDAY: number;
  OPEN24HOUR: number;
  HIGH24HOUR: number;
  LOW24HOUR: number;
  LASTMARKET: string;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  OPENHOUR: number;
  HIGHHOUR: number;
  LOWHOUR: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  CHANGE24HOUR: number;
  CHANGEPCT24HOUR: number;
  CHANGEDAY: number;
  CHANGEPCTDAY: number;
  CHANGEHOUR: number;
  CHANGEPCTHOUR: number;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  SUPPLY: number;
  MKTCAP: number;
  MKTCAPPENALTY: number;
  TOTALVOLUME24H: number;
  TOTALVOLUME24HTO: number;
  TOTALTOPTIERVOLUME24H: number;
  TOTALTOPTIERVOLUME24HTO: number;
  IMAGEURL: string;
}
export interface DISPLAY {
  USD: USD1;
}
export interface USD1 {
  FROMSYMBOL: string;
  TOSYMBOL: string;
  MARKET: string;
  PRICE: string;
  LASTUPDATE: string;
  LASTVOLUME: string;
  LASTVOLUMETO: string;
  LASTTRADEID: string;
  VOLUMEDAY: string;
  VOLUMEDAYTO: string;
  VOLUME24HOUR: string;
  VOLUME24HOURTO: string;
  OPENDAY: string;
  HIGHDAY: string;
  LOWDAY: string;
  OPEN24HOUR: string;
  HIGH24HOUR: string;
  LOW24HOUR: string;
  LASTMARKET: string;
  VOLUMEHOUR: string;
  VOLUMEHOURTO: string;
  OPENHOUR: string;
  HIGHHOUR: string;
  LOWHOUR: string;
  TOPTIERVOLUME24HOUR: string;
  TOPTIERVOLUME24HOURTO: string;
  CHANGE24HOUR: string;
  CHANGEPCT24HOUR: string;
  CHANGEDAY: string;
  CHANGEPCTDAY: string;
  CHANGEHOUR: string;
  CHANGEPCTHOUR: string;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  SUPPLY: string;
  MKTCAP: string;
  MKTCAPPENALTY: string;
  TOTALVOLUME24H: string;
  TOTALVOLUME24HTO: string;
  TOTALTOPTIERVOLUME24H: string;
  TOTALTOPTIERVOLUME24HTO: string;
  IMAGEURL: string;
}

export interface BlockChainInfo {
  id?: number;
  time?: number;
  symbol?: string;
  partner_symbol?: string;
  zero_balance_addresses_all_time?: number;
  unique_addresses_all_time?: number;
  new_addresses?: number;
  active_addresses?: number;
  average_transaction_value?: number;
  block_height?: number;
  hashrate?: number;
  difficulty?: number;
  block_time?: number;
  block_size?: number;
  current_supply?: number;
  transaction_count?: number;
  transaction_count_all_time?: number;
  large_transaction_count?: number;
}
