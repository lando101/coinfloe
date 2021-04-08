import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-top-gainers',
  templateUrl: './top-gainers.component.html',
  styleUrls: ['./top-gainers.component.scss'],
})
export class TopGainersComponent implements OnInit {
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
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 7000,
  };

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
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.coins.length > 0) {
      // this.coins = this.coins.reverse();
      let tempArray: Coin[] = this.coins;
      this.coins = [];
      tempArray.forEach((coin, index) => {
        if (coin) {
          this.coins.push(tempArray[tempArray.length - (index + 1)]);
        }
      });
      this.coins.splice(0, 1); // removing empty coin
    }
  }

  openBottomSheet(coin: Coin) {
    // console.log('SHOW BOTTOM SHEET');
    this.showCoinDetails.emit(true);
    this.coin.emit(coin);
  }
}
