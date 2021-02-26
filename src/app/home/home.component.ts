import { Component, OnInit } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';

import { Coin } from 'src/models/coins.model';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  coins: Coin[] = [];
  theme: string = '';

  defaultQuery: CryptoQuery = {
    coin: 'Bitcoin',
    symbol: 'BTC',
    limit: 100,
    fiat: 'USD',
  };
  constructor(private cryptoService: CryptoDataServiceService) {}

  ngOnInit() {
    this.isLoading = true;
    // this.getCryptosList();
    this.cryptoService.coinsObs.subscribe((data) => {
      console.log('HOME');
      console.log(data);
      this.coins = data;
    });
  }

  // getCryptosList() {
  //   this.isLoading = true;
  //   this.cryptoService.coinsObs
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //       })
  //     )
  //     .subscribe((data) => {
  //       // console.log(data);
  //       // data.forEach((element: Coin) => {
  //       //   this.coins.push(element);
  //       // });
  //       console.log('HOME');
  //       this.coins = data;
  //       console.log(data);
  //     });
  // }
}
