import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin, CoinCG } from 'src/models/coins.model';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { ThemeService } from '@app/services/theme.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { CoinInfo, CoinInfoExpanded } from 'src/models/coin-info.model';
import { CgCoinDataService } from '@app/services/cg-coin-data.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

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
  // @Input() visible: boolean;
  // @Input() coin: Coin;

  visible: boolean;
  coin: Coin;
  viewingCoin: CoinCG;
  @Output() hideCoinDetails = new EventEmitter<boolean>();
  params: CryptoQuery = {};
  coinInfo: CoinInfo;

  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.25,
    // suppressScrollY: false,
  };

  imgURL = '';
  prettyImgURL = '';
  theme: string = '';

  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private bottomSheetService: BottomSheetService,
    private themeService: ThemeService,
    private cryptoDataService: CryptoDataServiceService,
    private coinCGService: CgCoinDataService
  ) {}

  ngOnInit(): void {
    // this.bottomSheetService.setState(false);
    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      } else {
        this.theme = 'light';
      }
    });
    this.bottomSheetService.bottomSheetShow.subscribe((data: boolean) => {
      this.visible = data;
    });
    this.bottomSheetService.coin.subscribe((data: CoinCG) => {
      this.viewingCoin = data;

      if (!!this.viewingCoin) {
        // console.log('BOTTOM SHEET COIN');
        // console.log(this.coin);
        // console.log('BOTTOM SHEET COIN');
        console.log('VIEWING COIN');
        console.log(data);
        console.log('VIEWING COIN');
        this.load();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.bottomSheetService.setState(this.visible);
    // this.imgURL = `https://www.cryptocompare.com${this.coin?.CoinInfo.ImageUrl}`;
    // this.prettyImgURL = `https://cryptologos.cc/logos/${this.coin?.CoinInfo?.FullName.replace(
    //   ' ',
    //   '-'
    // ).toLowerCase()}-${this.coin?.CoinInfo?.Name.toLowerCase()}-logo.png?v=010`;
    // if (!!this.coin) {
    //   this.params = {
    //     coin: this.coin.CoinInfo.FullName,
    //     symbol: this.coin.CoinInfo.Name,
    //     limit: 100,
    //     fiat: 'USD',
    //   };
    //   this.getCoinInfo();
    // }
  }

  load() {
    // this.getCoinInfo();
    this.getCoinOHLC();
    this.getCoinInfo();
  }

  closeBottomSheet() {
    // this.bottomSheetService.setState(false);
    this.bottomSheetService.setState(false, null);
    // this.hideCoinDetails.emit(false);
  }

  getCoinOHLC() {
    this.coinCGService
      .getCoinOhlc(this.viewingCoin.id, 7)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
      });
  }

  // get coin info from coin market cap
  getCoinInfo() {
    this.coinCGService
      .getCoinInfo(this.viewingCoin.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (data: any) => {
          this.coinInfo = data;
          console.log(data);
        },
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.next(true);
    // Unsubscribe from the subject
    this.unsubscribe.unsubscribe();
  }
}
