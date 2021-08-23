import { Component, OnInit } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';

import { Coin } from 'src/models/coins.model';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { ThemeService } from '@app/services/theme.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { UserService } from '@app/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class ChartsComponent implements OnInit {
  coins: Coin[] = [];
  theme: string = '';
  bottomSheet: boolean;
  selectedCoin: Coin = {};
  isLoading: boolean;
  user: User;
  userFavorites: string[];

  constructor(
    private cryptoService: CryptoDataServiceService,
    private themeService: ThemeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.cryptoService.coinsObs.subscribe((data) => {
    //   // console.log('HOME');
    //   // console.log(data);
    //   this.coins = data;
    // });
    // setTimeout(() => {
    this.getCoins().then((coins: Coin[]) => {
      // doing this for better page load performance
      this.userService.user$.subscribe((user: User) => {
        if (user) {
          if (user?.favorite_coins.join() !== this.user?.favorite_coins.join()) {
            console.log('CHART USER');
            console.log(user?.favorite_coins);
            console.log(this.user?.favorite_coins);
            console.log('CHART USER');
            this.user = user;
            // alert('THERE IS A USER');

            if (coins.length > 0) {
              this.findFavorites(coins);
              // alert('THERE IS A USER AND FINDING FAVS');
            }
          }
        }
      });
    });
    // }, 250);

    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });
  }

  getCoins() {
    const promise = new Promise((resolve, reject) => {
      this.cryptoService.getCryptoData().subscribe((coins: Coin[]) => {
        this.isLoading = true;
        if (coins) {
          // this.coins = coins;
          resolve(coins);
        } else {
          reject('No coins');
        }
      });
    });
    return promise;
  }

  findFavorites(coins: Coin[]) {
    let tempCoins: Coin[] = [];

    const promise = new Promise((resolve, reject) => {
      coins.forEach((coin) => {
        const match = this.user.favorite_coins.find((fav) => coin.CoinInfo.Name.toLowerCase() === fav.toLowerCase());
        // console.log(coin);
        if (match) {
          coin.FAVORITE = true;
        } else {
          coin.FAVORITE = false;
        }
        tempCoins.push(coin);
      });
      resolve('');
    }).then(() => {
      this.coins = tempCoins;
    });

    return promise;
  }

  setSelectedCoin(event: any) {
    this.selectedCoin = event;
    console.log(event);
  }

  displayCoin(event: any) {
    this.bottomSheet = !this.bottomSheet;
  }

  addFavorite(coin: Coin) {
    this.userService.addFavorite(coin.CoinInfo.Name.toUpperCase());
  }

  removeFavorite(coin: Coin) {
    this.userService.removeFavorite(coin.CoinInfo.Name.toUpperCase());
  }
}
