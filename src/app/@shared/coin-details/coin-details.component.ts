import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openLink(event: MouseEvent): void {
    // this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
