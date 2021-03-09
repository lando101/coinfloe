import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, finalize } from 'rxjs/operators';
import { Coin } from 'src/models/coins.model';

import { UntilDestroy, untilDestroyed } from '@core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { ChangeDetectorRef } from '@angular/core';

import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      duration: 300,
    }),
    fadeOutDownOnLeaveAnimation({
      duration: 300,
    }),
  ],
})
export class ShellComponent implements OnInit {
  @ViewChild('perfectscroll') perfectScroll: PerfectScrollbarComponent;
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  isLoading: boolean;
  coins: Coin[] = [];
  theme: string = '';
  scrollTop = false;

  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.25,
    // suppressScrollY: false,
  };
  defaultQuery: CryptoQuery = {
    coin: 'Bitcoin',
    symbol: 'BTC',
    limit: 100,
    fiat: 'USD',
  };
  constructor(
    private media: MediaObserver,
    private cryptoService: CryptoDataServiceService,
    private themeService: ThemeService,
    private bottomSheetService: BottomSheetService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some((change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')
        ),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());

    // this.getCryptosList();
    // this.themeService.themeTypeBS.subscribe((data: any) => {
    //   if (data) {
    //     this.theme = data;
    //   }
    // });
    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
        console.log(data);
        console.log('THEME');
      }
    });

    this.cryptoService.getCryptoData().subscribe((data) => {
      console.log(data);
    });

    setTimeout(() => {}, 1000);
  }

  ngAfterViewInit(): void {
    this.bottomSheetService.bottomSheetShow.subscribe((data) => {
      if (data === true) {
        this.config.wheelSpeed = 0;
      } else {
        this.config.wheelSpeed = 0.25;
      }
    });
    this.perfectScroll.psScrollY.subscribe((data: any) => {
      let top = Number(this.perfectScroll.directiveRef.ps().lastScrollTop);
      console.log(Number(top));

      this.scrollTop = true;

      if (top > 480) {
        this.scrollTop = true;
        this.cd.detectChanges(); // manually triggers change detection :: something about shell component is off
      } else {
        this.scrollTop = false;
        this.cd.detectChanges();
      }
    });
  }

  backToTop() {
    this.perfectScroll.directiveRef.scrollToTop(0, 350);
  }
  // getCryptosList() {
  //   this.isLoading = true;
  //   this.cryptoService
  //     .getCryptoData(this.defaultQuery)
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //       })
  //     )
  //     .subscribe((data) => {
  //       // console.log(data);
  //       data.forEach((element: Coin) => {
  //         this.coins.push(element);
  //       });
  //       console.log(this.coins);
  //     });
  // }
}
