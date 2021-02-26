import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-coin-item',
  templateUrl: './coin-item.component.html',
  styleUrls: ['./coin-item.component.scss'],
})
export class CoinItemComponent implements OnInit {
  @Input() coin: Coin;
  @Input() theme: string;
  constructor() {}

  ngOnInit(): void {}
}
