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
import { OwlOptions } from 'ngx-owl-carousel-o';
export interface ChipFilterChart {
  name: string;
  width?: number;
  direction?: number;
  active: boolean;
  key: 1 | 7 | 14 | 30 | 90 | 180 | 365 | 'max';
}

export interface ChartData {
  time: number;
  open?: number;
  high?: number;
  low?: number;
  close: number;
}
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
  @Output() hideCoinDetails = new EventEmitter<boolean>();

  visible: boolean;
  coin: Coin;
  viewingCoin: CoinCG;
  params: CryptoQuery = {};
  coinInfo: CoinInfo;
  candleData: number[] = [];
  priceData: ChartData[] = [];

  selectedChip: ChipFilterChart;

  chips: ChipFilterChart[] = [
    { name: '24h', width: 57.8, direction: null, active: false, key: 1 },
    { name: '7d', width: 49.3, direction: null, active: false, key: 7 },
    { name: '14d', width: 55.4, direction: null, active: false, key: 14 },
    { name: '30d', width: 57.75, direction: null, active: true, key: 30 },
    { name: '3m', width: 53.75, direction: null, active: false, key: 90 },
    { name: '6m', width: 53.75, direction: null, active: false, key: 180 },
    { name: '1y', width: 47.35, direction: null, active: false, key: 365 },
    { name: 'Max', width: 62.35, direction: null, active: false, key: 'max' },
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
    nav: false,
  };

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
    this.themeService.themeTypeBS.pipe(takeUntil(this.unsubscribe)).subscribe((data) => {
      if (data) {
        this.theme = data;
      } else {
        this.theme = 'light';
      }
    });
    this.bottomSheetService.bottomSheetShow.pipe(takeUntil(this.unsubscribe)).subscribe((data: boolean) => {
      this.visible = data;
    });
    this.bottomSheetService.coin.pipe(takeUntil(this.unsubscribe)).subscribe((data: CoinCG) => {
      this.viewingCoin = data;

      if (!!this.viewingCoin) {
        console.log('VIEWING COIN');
        console.log(data);
        console.log('VIEWING COIN');
        this.load();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  }

  load() {
    this.getCoinOHLC(this.chips[3]); // 30 day range
    this.getCoinInfo();
  }

  closeBottomSheet() {
    this.bottomSheetService.setState(false, null);
  }

  // get coin chart info :: candles, etc
  getCoinOHLC(chip: ChipFilterChart) {
    this.selectedChip = chip;
    this.coinCGService
      .getCoinOhlc(this.viewingCoin.id, chip.key)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (data: any[]) => {
          console.log(data);
          this.candleData = data;
          this.priceData = [];
          data.forEach((numbers) => {
            this.priceData.push({
              time: numbers[0],
              open: numbers[1],
              high: numbers[2],
              low: numbers[3],
              close: numbers[4],
            }); // date and closing price
          });
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
