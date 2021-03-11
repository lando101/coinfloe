import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';
import { LowerCasePipe } from '@angular/common';
@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.scss'],
})
export class CoinItemComponent implements OnInit {
  @Input() coin: Coin;
  @Input() theme: string;
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

  // openBottomSheet(): void {
  //   this._bottomSheet.open(CoinDetailsComponent);
  // }
}
