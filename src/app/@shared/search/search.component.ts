import { Component, Input, OnInit } from '@angular/core';

import { Coin } from 'src/models/coins.model';
import Fuse from 'fuse.js';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
  coins: CoinSearch[] = [];
  searchTerm: string = '';
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

  constructor(private coinService: CryptoDataServiceService) {}

  ngOnInit(): void {
    this.coinService.coinsObs.subscribe((data) => {
      if (data) {
        data.forEach((element: Coin) => {
          this.coins.push({
            name: element.CoinInfo.FullName,
            symbol: element.CoinInfo.Name,
            price: element.DISPLAY.USD.PRICE,
            change: element.RAW.USD.CHANGEPCT24HOUR / 100,
            img: element.CoinInfo.ImageUrl,
          });
        });

        // console.log(this.coins);
        this.list = this.coins;
        console.log(this.list);
        this.fuse.setCollection(this.list);

        console.log('SEARCH');
        console.log(this.coins);
      }
    });
  }

  searchReports(pattern: string) {
    console.log(pattern);
    this.searchTerm = pattern;
    console.log(this.fuse.search(pattern));
    this.searchResult = this.fuse.search(pattern, { limit: 10 });
  }
}
