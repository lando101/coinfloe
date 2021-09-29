import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, finalize, map } from 'rxjs/operators';
import { Coin, CoinCG } from 'src/models/coins.model';

import { UntilDestroy, untilDestroyed } from '@core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { ChangeDetectorRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation,
  fadeOutDownOnLeaveAnimation,
} from 'angular-animations';
import { Title } from '@angular/platform-browser';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { of } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rotateCubeToLeft, rotateCubeToRight } from 'ngx-router-animations';
import { fadeIn, fadeInDown, fadeInUp, fadeOut } from 'ng-animate';
import { CgCoinDataService } from '@app/services/cg-coin-data.service';
import { NewsService } from '@app/services/news.service';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            timing: 0.18,
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeOut, {
          params: {
            timing: 0.18,
          },
        }),
      ]),
    ]),
    trigger('rotateCubeToLeft', [
      transition(
        'charts => news',
        useAnimation(fadeInUp, {
          params: {
            timing: 0.18,
            a: '20px',
            b: '0px',
          },
        })
      ),
      transition(
        'news => charts',
        useAnimation(fadeInDown, {
          params: {
            timing: 0.18,
            a: '-20px',
            b: '0px',
          },
        })
      ),
    ]),
  ],
})
export class ShellComponent implements OnInit {
  @ViewChild('perfectscroll') perfectScroll: PerfectScrollbarComponent;
  @ViewChild('drawer2', { static: false }) sidenav!: MatSidenav;
  deviceInfo: any = null;
  menuOpen = true;
  backDrop = false;
  theme: string = '';
  isLoading: boolean;
  showProfile: boolean = null;
  marqueePlay = true;
  marqueeInit = false;
  showSheet = false;

  coins: CoinCG[] = [];
  scrollTop = false;
  user_name = '';
  title_display = '';
  userProfile: User = null;

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
    private cd: ChangeDetectorRef,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    public router: Router,
    private deviceService: DeviceDetectorService,
    private coinCGService: CgCoinDataService,
    private newsService: NewsService
  ) {
    this.epicFunction();
  }

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

    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
        // console.log(data);
        // console.log('THEME');
      }
    });

    // this.cryptoService.coinsObs.subscribe((data) => {
    //   if (data) {
    //     this.coins = data;
    //   }
    // });

    // initing data
    this.coinCGService.getTop250Coins().subscribe((data) => {
      if (data) {
        this.coins = data;
      }
    });

    this.coinCGService.getGlobalMetrics().subscribe();

    this.newsService.getAllNews2().subscribe((data) => {});

    this.cryptoService.getCryptoBlockChainData().subscribe((data) => {});

    // this.cryptoService.getAllNews();

    // this.themeService.setThemeCookie();
    setTimeout(() => {
      this.marqueeInit = true;
    }, 3800);

    this.username();
    this.title();
    this.user();
  }

  ngAfterViewInit(): void {
    this.bottomSheetService.bottomSheetShow.subscribe((data) => {
      if (data === true) {
        this.marqueePlay = false;
        this.showSheet = true;
        // this.config.wheelSpeed = 0;
      } else {
        this.marqueePlay = true;
        setTimeout(() => {
          this.showSheet = false;
        }, 300);

        this.config.wheelSpeed = 0.25;
      }
    });
    this.perfectScroll.psScrollY.subscribe((data: any) => {
      let top = Number(this.perfectScroll.directiveRef.ps().lastScrollTop);
      // console.log(Number(top));

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

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet); // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  backToTop() {
    this.perfectScroll.directiveRef.scrollToTop(0, 350);
  }

  username(): string | null {
    const credentials = this.credentialsService.credentials;
    this.user_name = credentials ? credentials.username : null;
    // console.log(credentials);
    return credentials ? credentials.username : null;
  }

  user() {
    this.credentialsService.user$.subscribe((data: User) => {
      if (data) {
        this.userProfile = data;
      }
    });
  }

  title(): string {
    this.title_display = this.titleService.getTitle();
    return this.titleService.getTitle();
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  // opens right drawer
  openSidenav(profile?: boolean) {
    if (this.showProfile != profile || this.showProfile === null) {
      this.showProfile = profile;
      this.backDrop = true;
      this.sidenav.open();
    } else {
      this.closeSidenav();
    }
  }
  // closes right drawer
  closeSidenav() {
    this.showProfile = null;
    this.backDrop = false;
    this.sidenav.close();
  }

  get isMobile(): boolean {
    return this.media.isActive('sm') || this.media.isActive('md');
  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
