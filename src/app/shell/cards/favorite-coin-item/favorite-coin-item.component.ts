import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-favorite-coin-item',
  templateUrl: './favorite-coin-item.component.html',
  styleUrls: ['./favorite-coin-item.component.scss'],
})
export class FavoriteCoinItemComponent implements OnInit {
  @Input() coin: Coin;
  @Output() removeFavOutput = new EventEmitter<Coin>();
  @Output() addFavOutput = new EventEmitter<Coin>();
  imgURL = '';
  prettyImgURL = '';
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 2200, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
    speed: 400, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
    glare: false, // if it should have a "glare" effect
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
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.coin) {
      this.prettifyImg();
    }
  }

  prettifyImg() {
    this.imgURL = `https://www.cryptocompare.com${this.coin?.CoinInfo.ImageUrl}`;
    this.prettyImgURL = `https://cryptologos.cc/logos/${this.coin?.CoinInfo?.FullName.replace(
      ' ',
      '-'
    ).toLowerCase()}-${this.coin?.CoinInfo?.Name.toLowerCase()}-logo.png?v=010`;
  }

  removeFav(coin: Coin) {
    this.removeFavOutput.emit(coin);
  }
}
