import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coin, USD } from 'src/models/coins.model';
import Fuse from 'fuse.js';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CoinSearch } from '../search/search.component';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { GroupByPipe, KeysPipe, OrderByPipe, PairsPipe, FlattenPipe } from 'ngx-pipes';

@Component({
  selector: 'app-full-screen-search',
  templateUrl: './full-screen-search.component.html',
  styleUrls: ['./full-screen-search.component.scss'],
  providers: [OrderByPipe],
})
export class FullScreenSearchComponent implements OnInit {
  @Input() theme: string;
  topGainerCoins: Coin[] = [];
  coins: Coin[] = [];
  coinsSearch: CoinSearch[] = [];
  searchTerm: string = '';
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 1200, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 400, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
    glare: false, // if it should have a "glare" effect
    'max-glare': 1, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    'glare-prerender': false, // false = VanillaTilt creates the glare elements for you, otherwise
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    gyroscope: true, // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
  };
  options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    // minMatchCharLength: 1,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    minMatchCharLength: 1,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    useExtendedSearch: true,
    keys: ['name', 'symbol'],
  };

  list: CoinSearch[] = [{}];
  searchResult: any[];
  fuse = new Fuse(this.list, this.options);
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FullScreenSearchComponent>,
    private coinService: CryptoDataServiceService,
    private bottomSheetService: BottomSheetService,
    private orderByPipe: OrderByPipe
  ) {}

  ngOnInit(): void {
    this.coinService.coinsObs.subscribe((data) => {
      if (data) {
        this.coins = data;
        this.orderPCTGains24h(this.coins);
        data.forEach((element: Coin) => {
          this.coinsSearch.push({
            name: element.CoinInfo.FullName,
            symbol: element.CoinInfo.Name,
            price: element?.DISPLAY?.USD?.PRICE || 'NA',
            change: element?.RAW?.USD?.CHANGEPCT24HOUR / 100 || null,
            img: element.CoinInfo.ImageUrl,
          });
        });

        // console.log(this.coins);
        this.list = this.coinsSearch;
        // console.log(this.list);
        this.fuse.setCollection(this.list);

        // console.log('SEARCH');
        // console.log(this.coins);
      }
    });
  }

  searchReports(pattern: string) {
    console.log(pattern);
    this.searchTerm = pattern;
    console.log(this.fuse.search(pattern));
    this.searchResult = this.fuse.search(pattern, { limit: 10 });
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
  }

  openBottomSheet(coin: CoinSearch) {
    const match = this.coins.find((x) => x.CoinInfo.Name === coin.symbol);

    // this.showCoinDetails.emit(true);
    // this.coin.emit(coin);
    this.bottomSheetService.setState(true, match);
  }

  dimiss(): void {
    this._bottomSheetRef.dismiss();
  }
}
