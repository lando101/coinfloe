import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MarketData } from 'src/models/coin-info.model';
import * as moment from 'moment';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInUp, fadeOutDown } from 'ng-animate';
@Component({
  selector: 'app-ath-widget',
  templateUrl: './ath-widget.component.html',
  styleUrls: ['./ath-widget.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        useAnimation(fadeInUp, {
          params: {
            timing: 0.15,
            a: '20px',
            b: '0px',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeOutDown, {
          params: {
            timing: 0.15,
            a: '0px',
            b: '60px',
          },
        }),
      ]),
    ]),
  ],
})
export class AthWidgetComponent implements OnChanges {
  @Input() theme: string;
  @Input() marketData: MarketData;
  show: boolean;
  time: any;
  constructor() {}

  ngOnChanges(): void {
    if (!!this.marketData) {
      this.time = moment(this.marketData.ath_date.usd).format('L');
      setTimeout(() => {
        this.show = true;
      }, 1000);
    }
  }
}
