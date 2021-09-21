import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';
import { BlockChainInfo, Coin, CoinCG, TrendingCoin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { GlobalData } from 'src/models/crypto-global-data.model';
import { CryptoQuery } from './crypto-data-service.service';
import { GlobalMetrics } from 'src/models/global-metric.model';

export interface CoinParams {
  name: string;
  days: 1 | 7 | 14 | 30 | 90 | 180 | 365 | 'max';
}

const routes = {
  globalMetrics: () => `/crypto/global-metrics`,
  top250Coins: () => `/crypto/cg-top-250`,
  trendingCoins: () => `/crypto/cg-trending-coins`,
  coinInfo: (coin: string) => `/crypto/cg-coin-info/${coin}`,
  coinOhlc: (coin: CoinParams) => `/crypto/cg-coin-ohlc/${coin.name}?days=${coin.days.toString()}`,
};

@Injectable({
  providedIn: 'root',
})
export class CgCoinDataService {
  $coins: BehaviorSubject<any> = new BehaviorSubject<CoinCG[]>(null); // subscribe for crypto data
  $globalMetrics: BehaviorSubject<any> = new BehaviorSubject<GlobalMetrics>(null);

  constructor(private _httpClient: HttpClient) {}

  // public getGlobalMetrics() {
  //   const promise = new Promise((resolve, reject) => {
  //     this._httpClient.get(routes.globalMetrics()).pipe(
  //       map((body: any) => {
  //         const result: any = body.data.data;
  //         if (!!result) {
  //           this.$globalMetrics.next(result);
  //           resolve(result);
  //         } else {
  //           reject('Error, could not get crypto data');
  //         }
  //       })
  //     );
  //   });
  // }
  // get cg data about coin

  // get a coins info
  public getCoinInfo(name: string): Observable<any> {
    return this._httpClient.get(routes.coinInfo(name)).pipe(
      map((result: any) => {
        const coinInfo: any = result.data;
        console.log('COIN INFO DATA');
        console.log(coinInfo);
        console.log('COIN INFO DATA');
        return coinInfo;
      }),
      catchError(() => of('Error, could not get coin info'))
    );
  }

  // get data for line chart
  public getCoinOhlc(coinName: string, ohlcDays: 1 | 7 | 14 | 30 | 90 | 180 | 365 | 'max'): Observable<any> {
    const coin: CoinParams = { name: coinName, days: ohlcDays };
    return this._httpClient.get(routes.coinOhlc(coin)).pipe(
      map((result: any) => {
        const coinOhlc: any = result.data;
        console.log('COIN OHLC DATA');
        console.log(coinOhlc);
        console.log('COIN OHLC DATA');
        return result;
      }),
      catchError(() => of('Error, could not get coin info'))
    );
  }

  // global metrics
  public getGlobalMetrics(): Observable<any> {
    return this._httpClient.get(routes.globalMetrics()).pipe(
      map((result: any) => {
        const metrics: GlobalMetrics = result.data.data;
        this.$globalMetrics.next(metrics);
        return result;
      }),
      catchError(() => of('test'))
    );
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
