import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-top-losers',
  templateUrl: './top-losers.component.html',
  styleUrls: ['./top-losers.component.scss'],
})
export class TopLosersComponent implements AfterContentInit {
  @Input() theme: string;
  @Input() coins: Coin[];
  @Input() showBottomSheet: boolean;

  @Output() showCoinDetails = new EventEmitter<boolean>();
  @Output() coin = new EventEmitter<Coin>();

  isDragging = false;
  startPosition = 0;
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.02, // 2 = 200%, 1.5 = 150%, etc..
    speed: 350, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
    glare: true, // if it should have a "glare" effect
    'max-glare': 0.08, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    'glare-prerender': false, // false = VanillaTilt creates the glare elements for you, otherwise
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    gyroscope: true, // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
  };

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
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(private bottomSheetService: BottomSheetService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterContentInit(): void {}

  // openBottomSheet(coin: Coin) {
  //   // console.log('SHOW BOTTOM SHEET');
  //   this.showCoinDetails.emit(true);
  //   this.coin.emit(coin);
  // }
  openBottomSheet(coin: Coin) {
    this.bottomSheetService.setState(true, coin);
  }
}
