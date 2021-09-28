import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fadeInUp, fadeOutDown } from 'ng-animate';
import { MarketData } from 'src/models/coin-info.model';

@Component({
  selector: 'app-market-info-widget',
  templateUrl: './market-info-widget.component.html',
  styleUrls: ['./market-info-widget.component.scss'],
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
export class MarketInfoWidgetComponent implements OnChanges {
  @Input() theme: string;
  @Input() marketData: MarketData;
  show: boolean;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.marketData) {
      setTimeout(() => {
        this.show = true;
      }, 400);
    }
  }
}
