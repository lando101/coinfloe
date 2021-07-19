import { Coin } from './coins.model';
import { NewsSource2 } from './news.model';

export interface User {
  uid?: string | number;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone?: string | number;
  created?: string | Date;
  signed_in?: string | Date;
  favorite_coins?: Coin[];
  favorite_articles?: NewsSource2[];
  followers_count?: number;
  followers?: any;
  following?: any;
  following_count?: any;
  groups?: any;
  theme?: string;
}
