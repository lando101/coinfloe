export interface CoinPriceHistory {
  time?: any;
  value?: number;
}

export interface PriceDataContainer {
  Aggregated?: boolean;
  TimeFrom?: number;
  TimeTo?: number;
  Data?: PriceData[];
}

export interface PriceData {
  time?: any;
  high?: number;
  low?: number;
  open?: number;
  volumefrom?: number;
  volumeto?: number;
  close?: number;
  conversionType?: string;
  conversionSymbol?: string;
}
