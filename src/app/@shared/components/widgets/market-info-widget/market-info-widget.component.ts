import { Component, Input, OnInit } from '@angular/core';
import { MarketData } from 'src/models/coin-info.model';

@Component({
  selector: 'app-market-info-widget',
  templateUrl: './market-info-widget.component.html',
  styleUrls: ['./market-info-widget.component.scss'],
})
export class MarketInfoWidgetComponent implements OnInit {
  @Input() theme: string;
  @Input() marketData: MarketData;
  constructor() {}

  ngOnInit(): void {}
}
