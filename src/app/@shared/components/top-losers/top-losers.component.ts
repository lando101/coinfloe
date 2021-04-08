import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-top-losers',
  templateUrl: './top-losers.component.html',
  styleUrls: ['./top-losers.component.scss'],
})
export class TopLosersComponent implements OnInit {
  @Input() theme: string;
  @Input() coins: Coin[];
  @Input() showBottomSheet: boolean;
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();

  slides = [
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 2, dots: true, infinite: false };

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('TOP LOSERS');
    // console.log(this.coins);
    // console.log('TOP LOSERS');
  }
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor() {}

  ngOnInit(): void {}

  openBottomSheet(coin: Coin) {
    console.log('SHOW BOTTOM SHEET');
    this.showCoinDetails.emit(true);
    this.coin.emit(coin);
  }
}
