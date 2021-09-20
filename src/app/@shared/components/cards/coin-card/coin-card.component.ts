import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { Coin, CoinCG } from 'src/models/coins.model';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.scss'],
})
export class CoinCardComponent implements OnInit {
  @Input() theme: string;
  @Input() coin: CoinCG;
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coinEmit = new EventEmitter<CoinCG>();

  imgURL = '';
  constructor(private bottomSheetService: BottomSheetService) {}

  ngOnInit(): void {
    // this.imgURL = `https://www.cryptocompare.com${this.coin?.CoinInfo.ImageUrl}`;
  }

  openBottomSheet(coin: Coin) {
    this.bottomSheetService.setState(true);
  }
}
