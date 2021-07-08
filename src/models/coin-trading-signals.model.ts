export interface TradingSignals {
  id?: number;
  time?: number;
  symbol?: string;
  partner_symbol?: string;
  inOutVar?: AddressesNetGrowth;
  largetxsVar?: AddressesNetGrowth;
  addressesNetGrowth?: AddressesNetGrowth;
  concentrationVar?: AddressesNetGrowth;
}

export interface AddressesNetGrowth {
  category?: string;
  sentiment?: string;
  value?: number;
  score?: number;
  score_threshold_bearish?: number;
  score_threshold_bullish?: number;
}
