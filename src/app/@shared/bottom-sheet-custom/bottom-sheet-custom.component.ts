import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-bottom-sheet-custom',
  templateUrl: './bottom-sheet-custom.component.html',
  styleUrls: ['./bottom-sheet-custom.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      duration: 300,
    }),
    fadeOutDownOnLeaveAnimation({
      duration: 300,
    }),
  ],
})
export class BottomSheetCustomComponent implements OnInit {
  @Input() visible: boolean;
  @Input() coin: Coin;
  @Output() hideCoinDetails = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeBottomSheet() {
    this.hideCoinDetails.emit(false);
  }
}
