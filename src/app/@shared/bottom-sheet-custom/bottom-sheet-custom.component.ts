import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';
import { BottomSheetService } from '@app/services/bottom-sheet.service';

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
    fadeInOnEnterAnimation({
      duration: 150,
    }),
    fadeOutOnLeaveAnimation({
      duration: 300,
    }),
  ],
})
export class BottomSheetCustomComponent implements OnInit {
  @Input() visible: boolean;
  @Input() coin: Coin;
  @Output() hideCoinDetails = new EventEmitter<boolean>();

  constructor(private bottomSheetService: BottomSheetService) {}

  ngOnInit(): void {
    this.bottomSheetService.setState(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.bottomSheetService.setState(this.visible);
  }

  closeBottomSheet() {
    this.bottomSheetService.setState(false);
    this.hideCoinDetails.emit(false);
  }
}
