import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-coin-card-loader',
  templateUrl: './coin-card-loader.component.html',
  styleUrls: ['./coin-card-loader.component.scss'],
})
export class CoinCardLoaderComponent implements OnInit {
  @Input() theme: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}
