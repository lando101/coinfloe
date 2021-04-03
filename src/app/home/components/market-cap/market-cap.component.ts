import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-cap',
  templateUrl: './market-cap.component.html',
  styleUrls: ['./market-cap.component.scss'],
})
export class MarketCapComponent implements OnInit {
  @Input() theme: string;

  constructor() {}

  ngOnInit(): void {}
}
