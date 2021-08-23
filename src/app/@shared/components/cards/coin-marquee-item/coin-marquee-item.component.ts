import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-coin-marquee-item',
  templateUrl: './coin-marquee-item.component.html',
  styleUrls: ['./coin-marquee-item.component.scss'],
})
export class CoinMarqueeItemComponent implements OnInit {
  @Input() coin: Coin;
  @Input() theme: string;
  imgURL: string;
  prettyImgURL: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.coin?.currentValue) {
      this.imgURL = `https://www.cryptocompare.com${this.coin?.CoinInfo.ImageUrl}`;
      this.prettyImgURL = `https://cryptologos.cc/logos/${this.coin?.CoinInfo?.FullName.replace(
        ' ',
        '-'
      ).toLowerCase()}-${this.coin?.CoinInfo?.Name.toLowerCase()}-logo.png?v=010`;
    }
  }
}