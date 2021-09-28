import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fadeInUp, fadeOutDown } from 'ng-animate';
import { CommunityData, Links } from 'src/models/coin-info.model';

@Component({
  selector: 'app-social-metrics-widget',
  templateUrl: './social-metrics-widget.component.html',
  styleUrls: ['./social-metrics-widget.component.scss'],
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
export class SocialMetricsWidgetComponent implements OnChanges {
  @Input() communityInfo: CommunityData;
  @Input() links: Links;
  @Input() communityScore: number;
  @Input() theme: string;
  show: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.communityInfo && !!this.communityScore)
      setTimeout(() => {
        this.show = true;
      }, 800);
  }
}
