import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-liquidity-widget',
  templateUrl: './liquidity-widget.component.html',
  styleUrls: ['./liquidity-widget.component.scss'],
})
export class LiquidityWidgetComponent implements OnInit {
  @Input() theme: string;
  constructor() {}

  ngOnInit(): void {}
}
