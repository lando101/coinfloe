import { Component, OnInit } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { Coin } from 'src/models/coins.model';

@Component({
  selector: 'app-favorites-coins-widget',
  templateUrl: './favorites-coins-widget.component.html',
  styleUrls: ['./favorites-coins-widget.component.scss'],
})
export class FavoritesCoinsWidgetComponent implements OnInit {
  favorites: string[] = ['BTC', 'XRP'];
  favoriteCoins: Coin[] = [];
  coins: Coin[] = [];
  constructor(private cryptoDataService: CryptoDataServiceService) {}

  ngOnInit(): void {
    this.cryptoDataService.coinsObs.subscribe({
      next: (coins: Coin[]) => {
        if (coins) {
          this.coins = coins;
          this.findFavoritesMatch();
        }
      },
      error: (error: any) => {
        this.coins = [];
      },
    });
  }

  // finds coin match with fav based on symbol to display data in fav item card
  findFavoritesMatch() {
    const tempFav: Coin[] = [];
    this.favorites.forEach((fav) => {
      tempFav.push(this.coins.find((coin) => coin.CoinInfo.Name.toLowerCase() === fav.toLowerCase()));
    });
    this.favoriteCoins = tempFav;
    console.log('FAVORITE COINS');
    console.log(this.favoriteCoins);
    console.log('FAVORITE COINS');
  }
}
