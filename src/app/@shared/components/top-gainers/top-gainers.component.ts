import { AfterContentInit } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { Coin } from 'src/models/coins.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-top-gainers',
  templateUrl: './top-gainers.component.html',
  styleUrls: ['./top-gainers.component.scss'],
})
export class TopGainersComponent implements AfterContentInit {
  @Input() theme: string;
  @Input() coins: Coin[];

  @Input() showBottomSheet: boolean;
  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();

  init = false;
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.02, // 2 = 200%, 1.5 = 150%, etc..
    speed: 400, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
    glare: true, // if it should have a "glare" effect
    'max-glare': 1, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    'glare-prerender': false, // false = VanillaTilt creates the glare elements for you, otherwise
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    gyroscope: true, // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
  };
  slides = [
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
  ];
  customOptions: OwlOptions = {
    items: 4,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoWidth: true,
    navSpeed: 260,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      400: {
        items: 2,
        nav: true,
      },
      740: {
        items: 3,
        nav: true,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 2250,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true,
        },
      },
      {
        breakpoint: 1860,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
        },
      },
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1042,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
    // autoplay: true,
    // autoplaySpeed: 7000,
  };
  constructor(private bottomSheetService: BottomSheetService) {}

  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }

  ngAfterContentInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.coins?.currentValue?.length > 0) {
      // this.coins = this.coins.reverse();
      let tempArray: Coin[] = this.coins;
      this.coins = [];
      tempArray.forEach((coin, index) => {
        // removing coins without proper data
        if (!!coin?.RAW?.USD?.MKTCAP) {
          this.coins.push(coin);
        }
      });
      this.coins.reverse();
      // this.coins.splice(0, 1); // removing empty coin
    }
  }

  // openBottomSheet(coin: Coin) {
  //   // console.log('SHOW BOTTOM SHEET');
  //   this.showCoinDetails.emit(true);
  //   this.coin.emit(coin);
  // }

  openBottomSheet(coin: Coin) {
    this.bottomSheetService.setState(true, coin);
  }
}
