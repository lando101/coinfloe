import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-coins-lists',
  templateUrl: './coins-lists.component.html',
  styleUrls: ['./coins-lists.component.scss'],
})
export class CoinsListsComponent implements OnInit {
  @Input() Coins: [];
  @Input() theme: string;

  localCoins: Coin[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('COINS');
    console.log(this.Coins);
    if (this.Coins) {
      this.localCoins = this.Coins;
    }
  }
}
