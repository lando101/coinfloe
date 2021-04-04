import { Component, OnInit } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';

import { Coin, USD } from 'src/models/coins.model';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';
import { GroupByPipe, KeysPipe, OrderByPipe, PairsPipe, FlattenPipe } from 'ngx-pipes';
import { BottomSheetService } from '@app/services/bottom-sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OrderByPipe, FlattenPipe],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  coins: Coin[] = [];
  topGainerCoins: Coin[] = [];
  topLoserCoins: Coin[] = [];
  topCoins: Coin[] = [];
  bottomSheet: boolean;
  selectedCoin: Coin = {};

  theme: string = '';

  defaultQuery: CryptoQuery = {
    coin: 'Bitcoin',
    symbol: 'BTC',
    limit: 100,
    fiat: 'USD',
  };
  constructor(
    private cryptoService: CryptoDataServiceService,
    private themeService: ThemeService,
    private orderByPipe: OrderByPipe,
    private flattenPipe: FlattenPipe,
    private bottomSheetService: BottomSheetService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    // this.getCryptosList();
    this.cryptoService.coinsObs.subscribe((data) => {
      if (data != '') {
        console.log('HOME');
        console.log(data);
        this.coins = data;
        this.orderPCTGains24h(this.coins);
        this.selectedCoin = this.coins[0];
      }
    });

    this.bottomSheetService.bottomSheetShow.subscribe((data) => {
      this.bottomSheet = data;
      console.log(this.bottomSheet);
    });

    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });
  }

  // order raw USD information by PCT gain
  orderPCTGains24h(coins: Coin[]) {
    let tempArray: USD[] = [];
    coins.forEach((coin) => {
      tempArray.push(coin?.RAW?.USD);
    });
    // console.log('TOP GAINERS');
    tempArray = this.orderByPipe.transform(tempArray, 'CHANGEPCT24HOUR');

    // console.log(tempArray);
    // console.log('TOP GAINERS');
    this.findMatch(tempArray);
  }

  // find match with USD data and Coin data
  findMatch(coinUSD: USD[]) {
    let tempArray: Coin[] = [];
    coinUSD.forEach((coin) => {
      let match: Coin = this.coins.find((x) => x?.CoinInfo?.Name.toLowerCase() === coin?.FROMSYMBOL?.toLowerCase());
      tempArray.push(match);
    });
    this.topGainerCoins = tempArray;
    console.log(this.topGainerCoins);
  }

  setSelectedCoin(event: any) {
    this.selectedCoin = event;
    console.log(event);
  }

  displayCoin(event: any) {
    console.log('Show state: ' + event);
    this.bottomSheet = !this.bottomSheet;
  }
}
