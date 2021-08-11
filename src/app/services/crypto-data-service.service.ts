import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BlockChainInfo, Coin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { GlobalData } from 'src/models/crypto-global-data.model';

const routes = {
  // allCryptos: (c: CryptoQuery) => `/data/top/mktcapfull?limit=${c.limit}&tsym=${c.fiat}&api_key=${c.api_key}`,
  allCryptos: (c: CryptoQuery) => `/crypto/top-100-cryptos`,
  blockChainInfo: (c: CryptoQuery) => `/crypto/blockchain/${c.symbol}`,
  tradingSignals: (c: CryptoQuery) => `/crypto/trading_signals/${c.symbol}`,
  cryptoDailyPrice: (c: CryptoQuery) => `/crypto/daily_historical/${c.symbol}`,
  cryptoHourlyPrice: (c: CryptoQuery) => `/crypto/hourly_historical/${c.symbol}`,
  cryptoMinutePrice: (c: CryptoQuery) => `/crypto/minute_historical/${c.symbol}`,
  allNews: (c: CryptoQuery) => `/crypto/news`,
  popularNews: (c: CryptoQuery) => `/crypto/popular-news`,
  cryptoNews: (c: CryptoQuery) => `/crypto/news/${c.symbol}`,
  cryptoAbout: (c: CryptoQuery) => `/crypto/info/${c.symbol}`,
  cryptoGlobal: (c: CryptoQuery) => `/crypto/info/quotes/latest/${c.fiat}`,
  globalMetrics: () => `/crypto/global-metrics`,
  // `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${this.API_KEY}`;
};

export interface CryptoQuery {
  coin?: string;
  symbol?: string;
  limit?: number;
  fiat?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoDataServiceService {
  coinsObs: BehaviorSubject<any> = new BehaviorSubject<any>(null); // subscribe for crypto data
  btcBlockChainObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data (default query)
  coinBlockChainObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data
  coinDailyPriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data
  coinHourlyPriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data
  coinMinutePriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data
  allNewsObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data
  popNewsObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data
  cryptoNewsObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for price data

  coinsArray: Coin[] = [];

  defaultQuery: CryptoQuery = {
    coin: 'Bitcoin',
    symbol: 'BTC',
    limit: 100,
    fiat: 'USD',
  };

  constructor(private _httpClient: HttpClient) {}

  // get coin info
  public getCryptoData(params?: CryptoQuery) {
    if (params) {
      return this._httpClient.get(routes.allCryptos(params)).pipe(
        map((body: any) => {
          if (this.coinsArray !== body.data.Data) {
            this.setCryptoData(body.data.Data);
            this.coinsArray = body.data.Data;
          }
          return body.data.Data;
        }),
        catchError(() => of('Error, couldnt get cryptos'))
      );
    } else {
      return this._httpClient.get(routes.allCryptos(this.defaultQuery)).pipe(
        map((body: any) => {
          if (this.coinsArray !== body.data.Data) {
            this.setCryptoData(body.data.Data);
            this.coinsArray = body.data.Data;
          }
          return body.data.Data;
        }),
        catchError(() => of('Error, couldnt get cryptos'))
      );
    }
  }

  // get global crypto data :: coin market cap
  public getGlobalCrypto(): Observable<any> {
    const params: CryptoQuery = {
      fiat: 'USD',
    };
    return this._httpClient.get(routes.cryptoGlobal(params)).pipe(
      map((body: any) => {
        const data: GlobalData = body.data.data;
        return data;
      }),
      catchError(() => of('Error, couldnt get global data'))
    );
  }

  // get global metrics :: coin gecko
  public getGlobalMetrics(): Observable<any> {
    return this._httpClient.get(routes.globalMetrics()).pipe(
      map((body: any) => {
        const data: any = body.data.data;
        return data;
      }),
      catchError(() => of('Error, couldnt get global metrics'))
    );
  }

  // get coin block chain info
  public getCryptoBlockChainData(params?: CryptoQuery) {
    if (params) {
      return this._httpClient.get(routes.blockChainInfo(params)).pipe(
        map((body: any) => {
          this.setCryptoBlockChainData(body.data.Data, false);
          return body.Data;
        })
      );
    } else {
      return this._httpClient.get(routes.blockChainInfo(this.defaultQuery)).pipe(
        map((body: any) => {
          // console.log(body);
          this.setCryptoBlockChainData(body.data.Data, true);
          return body.Data;
        })
      );
    }
  }

  // get coin trading signals
  public getTradingSignals(params?: CryptoQuery): Observable<any> {
    if (params) {
      return this._httpClient.get(routes.tradingSignals(params)).pipe(
        map((data: any) => {
          return data.data.Data;
        }),
        catchError(() => of('Error, couldnt get global metrics'))
      );
    } else {
      return this._httpClient.get(routes.tradingSignals(this.defaultQuery)).pipe(
        map((data: any) => {
          return data.data.Data;
        }),
        catchError(() => of('Error, couldnt get global metrics'))
      );
    }
  }

  // get coin historical price :: daily
  public getCryptoDailyPrice(params: CryptoQuery) {
    this._httpClient.get(routes.cryptoDailyPrice(params)).subscribe({
      next: (data: any) => {
        this.coinDailyPriceObs.next(data.data.Data);
        // console.log(data);
      },
      error: (error) => {},
    });
  }

  // get coin historical price :: daily
  public getCryptoHourlyPrice(params: CryptoQuery) {
    this._httpClient.get(routes.cryptoHourlyPrice(params)).subscribe({
      next: (data: any) => {
        this.coinHourlyPriceObs.next(data.data.Data);
        // console.log(data);
      },
      error: (error) => {},
    });
  }

  // get coin historical price :: minute
  public getCryptoMinutePrice(params: CryptoQuery) {
    this._httpClient.get(routes.cryptoMinutePrice(params)).subscribe({
      next: (data: any) => {
        this.coinMinutePriceObs.next(data.data.Data);
        // console.log(data);
      },
      error: (error) => {},
    });
  }

  // get all news data
  public getAllNews() {
    let news: NewsSource1[] = [];

    this._httpClient.get(routes.allNews(this.defaultQuery)).subscribe({
      next: (data: any) => {
        news = data.data.Data;
        this.allNewsObs.next(news);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // get all news data
  public getPopNews() {
    let news: NewsSource1[] = [];

    this._httpClient.get(routes.popularNews(this.defaultQuery)).subscribe({
      next: (data: any) => {
        news = data.data.Data;
        this.popNewsObs.next(news);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // get coin news
  public getCoinNews(params: CryptoQuery) {
    let news: NewsSource1[] = [];
    this._httpClient.get(routes.cryptoNews(params)).subscribe({
      next: (data: any) => {
        // console.log('ALL NEWS!!!!!!!!!!!!!!!!!!!!!!!');
        this.cryptoNewsObs.next(data.data);
        // console.log('ALL NEWS!!!!!!!!!!!!!!!!!!!!!!!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // get coin info
  getCoinInfo(params: CryptoQuery): Observable<any> {
    return this._httpClient.get(routes.cryptoAbout(params)).pipe(
      map((data: any) => {
        return data.data.data[`${params.symbol.toUpperCase()}`];
      })
    );
  }

  // set observerable array
  setCryptoData(coins: Coin[]) {
    // console.log('COINS SERVICE');
    // console.log(coins);
    this.coinsObs.next(coins);
  }

  // set observerable array
  setCryptoBlockChainData(blockChain: BlockChainInfo, defaultQuery: boolean) {
    if (defaultQuery) {
      this.btcBlockChainObs.next(blockChain); // btc info
    } else {
      this.coinBlockChainObs.next(blockChain); // specified coin info
    }
  }
}
