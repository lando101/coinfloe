import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';

import { Coin, USD } from 'src/models/coins.model';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';
import { GroupByPipe, KeysPipe, OrderByPipe, PairsPipe, FlattenPipe } from 'ngx-pipes';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { GlobalData } from 'src/models/crypto-global-data.model';
import { GlobalMetrics } from 'src/models/global-metric.model';
import { TradingSignals } from 'src/models/coin-trading-signals.model';
import { User } from 'src/models/user.model';
import { UserService } from '@app/services/user.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAward, faIcicles } from '@fortawesome/free-solid-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OrderByPipe, FlattenPipe],
})
export class HomeComponent implements AfterViewInit {
  quote: string | undefined;
  isLoading = false;
  coins: Coin[] = [];
  topGainerCoins: Coin[] = [];
  topLoserCoins: Coin[] = [];
  topCoins: Coin[] = [];
  bottomSheet: boolean;
  selectedCoin: Coin = {};
  globalData: GlobalData;
  globalMetrics: GlobalMetrics;
  tradingSignals: TradingSignals;
  user: User;

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
    private bottomSheetService: BottomSheetService,
    private userService: UserService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faAward, faHotjar, faIcicles);
  }
  ngAfterViewInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.getCoins().then((coins: Coin[]) => {
        // doing this for better page load performance
        this.userService.user$.subscribe((user: User) => {
          if (user) {
            this.user = user;
            // alert('THERE IS A USER');
            if (coins.length > 1) {
              this.findFavorites(coins);
              // alert('THERE IS A USER AND FINDING FAVS');
            }
          }
        });
      });
    }, 250);

    this.bottomSheetService.bottomSheetShow.subscribe((data) => {
      this.bottomSheet = data;
      // console.log(this.bottomSheet);
    });

    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });

    // coin market cap data
    this.cryptoService.getGlobalCrypto().subscribe((data: GlobalData) => {
      this.globalData = data;
    });

    // coin market cap data
    this.cryptoService.getGlobalMetrics().subscribe((data: GlobalMetrics) => {
      this.globalMetrics = data;
    });

    this.cryptoService.getTradingSignals().subscribe((data: TradingSignals) => {
      this.tradingSignals = data;
      // console.log('BTC TRADING SIGNALS');
      // console.log(data);
      // console.log('BTC TRADING SIGNALS');
    });
  }
  ngOnInit() {}

  getCoins() {
    const promise = new Promise((resolve, reject) => {
      this.cryptoService.getCryptoData().subscribe((coins: Coin[]) => {
        this.isLoading = true;
        if (coins) {
          this.coins = coins;
          this.orderPCTGains24h(this.coins);
          this.selectedCoin = this.coins[0];
          resolve(coins);
        } else {
          reject('No coins');
        }
      });
    });
    return promise;
  }

  findFavorites(coins: Coin[]) {
    let tempCoins: Coin[] = [];

    const promise = new Promise((resolve, reject) => {
      coins.forEach((coin) => {
        const match = this.user.favorite_coins.find((fav) => coin.CoinInfo.Name.toLowerCase() === fav.toLowerCase());
        console.log(coin);
        if (match) {
          coin.FAVORITE = true;
        } else {
          coin.FAVORITE = false;
        }
        tempCoins.push(coin);
      });
      resolve('');
    }).then(() => {
      this.coins = tempCoins;
      this.orderPCTGains24h(this.coins);
      this.selectedCoin = this.coins[0];
    });

    return promise;
  }

  // order raw USD information by PCT gain
  orderPCTGains24h(coins: Coin[]) {
    let tempArray: USD[] = [];
    coins.forEach((coin) => {
      tempArray.push(coin?.RAW?.USD);
    });
    tempArray = this.orderByPipe.transform(tempArray, 'CHANGEPCT24HOUR');

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
    // alert('is loading');
    this.isLoading = false;
  }

  setSelectedCoin(event: any) {
    this.selectedCoin = event;
    // console.log(event);
  }

  displayCoin(event: any) {
    // console.log('Show state: ' + event);
    this.bottomSheet = !this.bottomSheet;
  }

  addFavorite(coin: Coin) {
    this.userService.addFavorite(coin.CoinInfo.Name.toUpperCase());
  }

  removeFavorite(coin: Coin) {
    this.userService.removeFavorite(coin.CoinInfo.Name.toUpperCase());
  }
}
