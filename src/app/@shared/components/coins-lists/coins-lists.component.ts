import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, USD } from 'src/models/coins.model';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';
import { GroupByPipe, KeysPipe, OrderByPipe, PairsPipe, FlattenPipe } from 'ngx-pipes';
import { BottomSheetCustomComponent } from '../bottom-sheet-custom/bottom-sheet-custom.component';
import { BottomSheetService } from '@app/services/bottom-sheet.service';

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
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();
  localCoins: Coin[] = [];
  @Input() loading: boolean;
  splice = 10;
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 2200, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
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
  constructor(private orderByPipe: OrderByPipe, private bottomSheetService: BottomSheetService) {}

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
    let tempCoins: Coin[] = [];

    coins.forEach((coin) => {
      // tempArray.push(coin?.RAW?.USD);
      if (!!coin?.RAW?.USD?.MKTCAP) {
        tempCoins.push(coin);
      }
    });

    tempArray = this.orderByPipe.transform(tempArray, 'MKTCAP');
    this.localCoins = this.orderByPipe.transform(tempCoins, 'RAW.USD.MKTCAP').reverse();
    // this.findMatch(tempArray);

    // console.log('ORDERED BY MARKET CAP');
    // console.log(tempArray);
    // console.log('ORDERED BY MARKET CAP');
  }

  // converting back into coin model
  findMatch(coinUSD: USD[]) {
    this.loading = true;
    let tempArray: Coin[] = [];
    coinUSD.forEach((coin) => {
      let match: Coin = this.Coins.find((x) => x?.CoinInfo?.Name.toLowerCase() === coin?.FROMSYMBOL?.toLowerCase());
      if (!!match) {
        tempArray.push(match);
      }
    });
    this.localCoins = tempArray.reverse();
  }

  openBottomSheet(coin: Coin) {
    this.bottomSheetService.setState(true, coin);
  }
}
