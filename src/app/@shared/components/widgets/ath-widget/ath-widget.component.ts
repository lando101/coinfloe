import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MarketData } from 'src/models/coin-info.model';
import * as moment from 'moment';
@Component({
  selector: 'app-ath-widget',
  templateUrl: './ath-widget.component.html',
  styleUrls: ['./ath-widget.component.scss'],
})
export class AthWidgetComponent implements OnChanges {
  @Input() theme: string;
  @Input() marketData: MarketData;
  time: any;
  constructor() {}

  ngOnChanges(): void {
    this.time = moment(this.marketData.ath_date.usd).format('L');
  }
}
