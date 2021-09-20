import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlockChainInfo, Coin, CoinCG, TrendingCoin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { GlobalData } from 'src/models/crypto-global-data.model';
import { CryptoQuery } from './crypto-data-service.service';
const routes = {
  globalMetrics: () => `/crypto/global-metrics`,
  top250Coins: () => `/crypto/cg-top-250`,
  trendingCoins: () => `/crypto/cg-trending-coins`,
  coinInfo: (c: CryptoQuery) => `/crypto/cg-coin-info/${c.coin}`,
};

@Injectable({
  providedIn: 'root',
})
export class CgCoinDataService {
  $coins: BehaviorSubject<any> = new BehaviorSubject<CoinCG[]>(null); // subscribe for crypto data
  $globalMetrics: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _httpClient: HttpClient) {}

  // global metrics
  public getGlobalMetrics() {
    const promise = new Promise((resolve, reject) => {
      this._httpClient.get(routes.globalMetrics()).pipe(
        map((body: any) => {
          const result: any = body.data.data;
          if (!!result) {
            this.$globalMetrics.next(result);
            resolve(result);
          } else {
            reject('Error, could not get crypto data');
          }
        })
      );
    });
  }

  // get top 250 coins
  // public getTop250Coins() {
  //   console.log('COIN GECKO SERVICE CALLED');

  //   const promise = new Promise((resolve, reject) => {
  //     this._httpClient.get(routes.top250Coins()).pipe(
  //       map((body: any) => {
  //         console.log(body);
  //         const coins: CoinCG[] = body.data;
  //         if (!!coins) {
  //           this.$coins.next(coins);
  //           resolve(coins);
  //         } else {
  //           reject('Error, could not get coins data');
  //         }
  //       })
  //     );
  //   });
  //   return promise;
  // }

  // get top 250 coins
  public getTop250Coins(): Observable<any> {
    return this._httpClient.get(routes.top250Coins()).pipe(
      map((result: any) => {
        const coins: CoinCG[] = result.data;
        if (coins.length > 1) {
          this.$coins.next(coins);
          return result.data;
        } else {
          return [];
        }
      }),
      catchError(() => of('Error, getting coin data from CG'))
    );
  }

  // get trending coins
  public getTrendingCoins() {
    const promise = new Promise((resolve, reject) => {
      this._httpClient.get(routes.trendingCoins()).pipe(
        map((body: any) => {
          const trendingCoins: TrendingCoin[] = body.coins;
        })
      );
    });
  }
}
