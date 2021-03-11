import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';

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
  constructor() {}

  ngOnInit(): void {
    this;
  }

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
