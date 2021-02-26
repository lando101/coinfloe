import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CoinDetailsComponent } from '../coin-details/coin-details.component';
@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.scss'],
})
export class CoinItemComponent implements OnInit {
  @Input() coin: Coin;
  @Input() theme: string;
  constructor() {}

  ngOnInit(): void {}

  // openBottomSheet(): void {
  //   this._bottomSheet.open(CoinDetailsComponent);
  // }
}
