import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';

export interface loaders {
  number: number;
}

@Component({
  selector: 'app-coins-lists',
  templateUrl: './coins-lists.component.html',
  styleUrls: ['./coins-lists.component.scss'],
})
export class CoinsListsComponent implements OnInit {
  @Input() Coins: [];
  @Input() theme: string;
  @Input() showBottomSheet: boolean;
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();
  localCoins: Coin[] = [];
  loader: loaders[] = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 10 },
  ];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('COINS');
    console.log(this.Coins);
    if (this.Coins) {
      this.localCoins = this.Coins;
    }
  }

  // openBottomSheet(): void {
  //   this._bottomSheet.open(CoinDetailsComponent);
  // }

  openBottomSheet(coin: Coin) {
    console.log('SHOW BOTTOM SHEET');
    this.showCoinDetails.emit(true);
    this.coin.emit(coin);
  }
}
