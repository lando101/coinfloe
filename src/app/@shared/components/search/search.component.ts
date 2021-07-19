import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Coin } from 'src/models/coins.model';
import Fuse from 'fuse.js';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BottomSheetService } from '@app/services/bottom-sheet.service';

export interface CoinSearch {
  name?: string;
  symbol?: string;
  price?: any;
  change?: number;
  img?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() theme: string;
  coins: Coin[] = [];
  coinsSearch: CoinSearch[] = [];
  searchTerm: string = '';
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();
  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.25,
    // suppressScrollY: false,
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

  constructor(private coinService: CryptoDataServiceService, private bottomSheetService: BottomSheetService) {}

  ngOnInit(): void {
    this.coinService.coinsObs.subscribe((data) => {
      if (data) {
        this.coins = data;
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

  openBottomSheet(coin: CoinSearch) {
    const match = this.coins.find((x) => x.CoinInfo.Name === coin.symbol);

    // this.showCoinDetails.emit(true);
    // this.coin.emit(coin);
    this.bottomSheetService.setState(true, match);
  }
}
