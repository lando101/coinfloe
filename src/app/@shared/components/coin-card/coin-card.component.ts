import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.scss'],
})
export class CoinCardComponent implements OnInit {
  @Input() coin: Coin;
  imgURL = '';
  prettyImgURL = '';
  constructor() {}

  ngOnInit(): void {
    this.imgURL = `https://www.cryptocompare.com${this.coin?.CoinInfo.ImageUrl}`;
    this.prettyImgURL = `https://cryptologos.cc/logos/${this.coin?.CoinInfo?.FullName.replace(
      ' ',
      '-'
    ).toLowerCase()}-${this.coin?.CoinInfo?.Name.toLowerCase()}-logo.png?v=010`;
  }
}
