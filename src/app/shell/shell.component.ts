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

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('perfectscroll') perfectScroll: PerfectScrollbarComponent;
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  isLoading: boolean;
  coins: Coin[] = [];
  theme: string = '';
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
    private bottomSheetService: BottomSheetService
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
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.bottomSheetService.bottomSheetShow.subscribe((data) => {
      if (data) {
        // this.config.suppressScrollY = data;
      }
      this.config.suppressScrollY = data;

      console.log(data);
      console.log('BOTTOM SHEET STATE');
    });
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