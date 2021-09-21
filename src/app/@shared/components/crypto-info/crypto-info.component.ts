import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CoinInfoExpanded } from 'src/models/coin-info.model';
import { Coin, CoinCG } from 'src/models/coins.model';

@Component({
  selector: 'app-crypto-info',
  templateUrl: './crypto-info.component.html',
  styleUrls: ['./crypto-info.component.scss'],
})
export class CryptoInfoComponent implements OnInit {
  @Input() theme: string;
  @Input() coin: CoinCG;
  @Input() coinInfo: CoinInfoExpanded;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.coinInfo);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('COIN INFO CHANGES');
  //   console.log(changes);
  //   console.log('COIN INFO CHANGES');
  // }
}
