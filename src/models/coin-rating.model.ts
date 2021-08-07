export interface CoinRating {
  id?: string;
  name?: string;
  symbol?: string;
  img_url?: string;
  price?: string | number;
  rating?: number;
  userRating?: number;
  userTags?: string[];
  username?: string;
}
