import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss'],
})
export class CoinInfoComponent implements OnInit {
  @Input() coin: Coin;
  queryParams: CryptoQuery;
  constructor(private cryptoDataService: CryptoDataServiceService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.coin);
    this.queryParams = {
      symbol: this.coin.CoinInfo.Name,
      coin: this.coin.CoinInfo.FullName,
    };

    this.cryptoDataService.getCoinInfo(this.queryParams).subscribe({
      next: (data) => {
        console.log('COIN INFO');
        console.log(data);
        console.log('COIN INFO');
      },
    });
  }
}
