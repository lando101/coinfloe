import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, USD } from 'src/models/coins.model';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';
import { GroupByPipe, KeysPipe, OrderByPipe, PairsPipe, FlattenPipe } from 'ngx-pipes';

export interface loaders {
  number: number;
}

@Component({
  selector: 'app-coins-lists',
  templateUrl: './coins-lists.component.html',
  styleUrls: ['./coins-lists.component.scss'],
  providers: [OrderByPipe, FlattenPipe],
})
export class CoinsListsComponent implements OnInit {
  @Input() Coins: Coin[];
  @Input() count: number;
  @Input() theme: string;
  @Input() showBottomSheet: boolean;
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();
  localCoins: Coin[] = [];
  splice = 10;
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
  constructor(private orderByPipe: OrderByPipe) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('COINS');
    // console.log(this.Coins);
    if (this.Coins) {
      this.orderByMarkCap(this.Coins);
      // this.localCoins = this.Coins;
    }
  }

  // openBottomSheet(): void {
  //   this._bottomSheet.open(CoinDetailsComponent);
  // }

  orderByMarkCap(coins: Coin[]) {
    let tempArray: USD[] = [];

    coins.forEach((coin) => {
      tempArray.push(coin?.RAW?.USD);
    });

    tempArray = this.orderByPipe.transform(tempArray, 'MKTCAP');
    this.findMatch(tempArray);
    // console.log('ORDERED BY MARKET CAP');
    // console.log(tempArray);
    // console.log('ORDERED BY MARKET CAP');
  }

  findMatch(coinUSD: USD[]) {
    let tempArray: Coin[] = [];
    coinUSD.forEach((coin) => {
      let match: Coin = this.Coins.find((x) => x?.CoinInfo?.Name.toLowerCase() === coin?.FROMSYMBOL?.toLowerCase());
      tempArray.push(match);
    });
    // console.log('ORDERED BY MARKET CAP');

    // console.log(tempArray);
    // console.log('ORDERED BY MARKET CAP');

    // this.localCoins = tempArray.slice(0, tempArray.length - 1).reverse();
    this.localCoins = tempArray.reverse();
  }

  openBottomSheet(coin: Coin) {
    console.log('SHOW BOTTOM SHEET');
    this.showCoinDetails.emit(true);
    this.coin.emit(coin);
  }
}
