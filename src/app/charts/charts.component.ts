import { Component, OnInit } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';

import { Coin } from 'src/models/coins.model';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  coins: Coin[] = [];
  theme: string = '';

  constructor(private cryptoService: CryptoDataServiceService, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.cryptoService.coinsObs.subscribe((data) => {
      console.log('HOME');
      console.log(data);
      this.coins = data;
    });

    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });
  }
}
