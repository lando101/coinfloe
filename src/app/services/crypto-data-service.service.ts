import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { BlockChainInfo, Coin } from 'src/models/coins.model';

const routes = {
  // allCryptos: (c: CryptoQuery) => `/data/top/mktcapfull?limit=${c.limit}&tsym=${c.fiat}&api_key=${c.api_key}`,
  allCryptos: (c: CryptoQuery) => `/crypto/top-100-cryptos`,
  blockChainInfo: (c: CryptoQuery) => `/crypto/blockchain/${c.symbol}`,
  cryptoDailyPrice: (c: CryptoQuery) => `/crypto/daily_historical/${c.symbol}`,
  cryptoHourlyPrice: (c: CryptoQuery) => `/crypto/hourly_historical/${c.symbol}`,
  cryptoMinutePrice: (c: CryptoQuery) => `/crypto/minute_historical/${c.symbol}`,
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
  coinsObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for crypto data
  btcBlockChainObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data (default query)
  coinBlockChainObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data
  coinDailyPriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data
  coinHourlyPriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data
  coinMinutePriceObs: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data

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
          this.setCryptoData(body.data.Data);
          return body.Data;
        }),
        catchError(() => of('Error, couldnt get cryptos'))
      );
    } else {
      return this._httpClient.get(routes.allCryptos(this.defaultQuery)).pipe(
        map((body: any) => {
          this.setCryptoData(body.data.Data);
          return body.Data;
        }),
        catchError(() => of('Error, couldnt get cryptos'))
      );
    }
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
          console.log(body);
          this.setCryptoBlockChainData(body.data.Data, true);
          return body.Data;
        })
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
        console.log(data);
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

  // set observerable array
  setCryptoData(coins: Coin[]) {
    console.log('COINS SERVICE');
    console.log(coins);
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
