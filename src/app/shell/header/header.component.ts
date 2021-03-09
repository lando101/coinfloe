import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { ThemeService } from '@app/services/theme.service';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { BlockChainInfo } from 'src/models/coins.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  theme: string = '';
  blockChainInfo: BlockChainInfo = {};
  constructor(
    public router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private themeService: ThemeService,
    private cryptoService: CryptoDataServiceService
  ) {}

  ngOnInit() {
    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
        console.log(data);
        console.log('THEME');
      }
    });

    this.cryptoService.btcBlockChainObs.subscribe((data) => {
      if (data) {
        this.blockChainInfo = data;
      }
    });
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
}
