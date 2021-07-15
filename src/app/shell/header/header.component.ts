import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { ThemeService } from '@app/services/theme.service';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { BlockChainInfo } from 'src/models/coins.model';
import { SidenavService } from '@app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  @Output() sideNavToggle = new EventEmitter<boolean>(true);
  tileSettings = {
    reverse: true, // reverse the tilt direction
    max: 6, // max tilt rotation (degrees)
    startX: 0, // the starting tilt on the X axis, in degrees.
    startY: 0, // the starting tilt on the Y axis, in degrees.
    perspective: 1200, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
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
  theme: string = '';
  cookieTheme = '';
  blockChainInfo: BlockChainInfo = {};
  constructor(
    public router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private themeService: ThemeService,
    private cryptoService: CryptoDataServiceService,
    private sideNavService: SidenavService
  ) {}

  ngOnInit() {
    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });

    this.cryptoService.btcBlockChainObs.subscribe((data) => {
      if (data) {
        this.blockChainInfo = data;
      }
    });

    this.sideNavService.sideNavShow.subscribe((data) => {});
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  setTheme() {
    let theme = this.theme;
    if (theme === 'dark') {
      theme = 'light';
      this.themeService.setTheme(theme);
    } else {
      theme = 'dark';
      this.themeService.setTheme(theme);
    }
  }

  toggleSideNav(profile: boolean) {
    this.sideNavToggle.emit(profile);
  }
}
