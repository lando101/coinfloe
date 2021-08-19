import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-high-low-progress',
  templateUrl: './high-low-progress.component.html',
  styleUrls: ['./high-low-progress.component.scss'],
})
export class HighLowProgressComponent implements OnInit {
  @Input() coin: Coin;
  @Input() price: number;
  @Input() high24h: number;
  @Input() low24h: number;
  @Input() showPercent = true;

  @Input() showPrice = true;
  high: number;
  low: number;
  progress: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('coin changes');
    // console.log(changes);
    // console.log('coin changes');
    if (!!changes?.coin?.currentValue) {
      this.coin = changes.coin.currentValue;
      this.setValues(this.coin);
    } else if (!!changes?.price?.currentValue) {
      // this.coin = changes.coin.currentValue;
      this.setValuesMethod2(this.price, this.high24h, this.low24h);
    }
  }

  // if full coin model provided
  setValues(coin: Coin) {
    const value = this.coin.RAW.USD.PRICE;
    const min = this.coin.RAW.USD.LOW24HOUR;
    const max = this.coin.RAW.USD.HIGH24HOUR;

    this.high = this.coin.RAW.USD.HIGH24HOUR;
    this.low = this.coin.RAW.USD.LOW24HOUR;
    this.progress = ((value - min) * 100) / (max - min);
    // this.progress = (this.coin.RAW.USD.PRICE / this.coin.RAW.USD.HIGH24HOUR) * 100;
    // console.log(`High: ${this.high}, Low: ${this.low}, Progress: ${this.progress}`);
  }

  // if only limited values provided
  setValuesMethod2(price: number, high: number, low: number) {
    const value = price;
    const min = low;
    const max = high;

    this.high = max;
    this.low = min;
    this.progress = ((value - min) * 100) / (max - min);
  }
}
