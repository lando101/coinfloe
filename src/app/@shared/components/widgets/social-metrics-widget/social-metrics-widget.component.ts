import { Component, Input, OnInit } from '@angular/core';
import { CommunityData, Links } from 'src/models/coin-info.model';

@Component({
  selector: 'app-social-metrics-widget',
  templateUrl: './social-metrics-widget.component.html',
  styleUrls: ['./social-metrics-widget.component.scss'],
})
export class SocialMetricsWidgetComponent implements OnInit {
  @Input() communityInfo: CommunityData;
  @Input() links: Links;
  @Input() communityScore: number;
  @Input() theme: string;

  constructor() {}

  ngOnInit(): void {}
}
