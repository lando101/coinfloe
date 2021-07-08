export interface GlobalData {
  active_cryptocurrencies?: number;
  total_cryptocurrencies?: number;
  active_market_pairs?: number;
  active_exchanges?: number;
  total_exchanges?: number;
  eth_dominance?: number;
  btc_dominance?: number;
  defi_volume_24h?: number;
  defi_volume_24h_reported?: number;
  defi_market_cap?: number;
  defi_24h_percentage_change?: number;
  stablecoin_volume_24h?: number;
  stablecoin_volume_24h_reported?: number;
  stablecoin_market_cap?: number;
  stablecoin_24h_percentage_change?: number;
  derivatives_volume_24h?: number;
  derivatives_volume_24h_reported?: number;
  derivatives_24h_percentage_change?: number;
  quote?: Quote;
  last_updated?: Date;
}

export interface Quote {
  USD?: Usd;
}

export interface Usd {
  total_market_cap?: number;
  total_volume_24h?: number;
  total_volume_24h_reported?: number;
  altcoin_volume_24h?: number;
  altcoin_volume_24h_reported?: number;
  altcoin_market_cap?: number;
  last_updated?: Date;
}
