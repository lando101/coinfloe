import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { UserService } from '@app/services/user.service';
import { Coin } from 'src/models/coins.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-favorites-coins-widget',
  templateUrl: './favorites-coins-widget.component.html',
  styleUrls: ['./favorites-coins-widget.component.scss'],
})
export class FavoritesCoinsWidgetComponent implements OnInit {
  @Input() user: User;
  @Input() theme: string;
  favorites: string[] = ['BTC', 'XRP'];
  favoriteCoins: Coin[] = [];
  coins: Coin[] = [];
  constructor(private cryptoDataService: CryptoDataServiceService, private userService: UserService) {}

  ngOnInit(): void {
    this.cryptoDataService.coinsObs.subscribe({
      next: (coins: Coin[]) => {
        if (coins) {
          this.coins = coins;
          // if (this.user?.favorite_coins?.length > 0) {
          //   this.findFavoritesMatch(this.user.favorite_coins);
          // }
        }
      },
      error: (error: any) => {
        this.coins = [];
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.user?.currentValue) {
      if (this.user?.favorite_coins?.length > 0) {
        this.findFavoritesMatch(this.user.favorite_coins);
      }
    }
  }

  // finds coin match with fav based on symbol to display data in fav item card
  findFavoritesMatch(favorites?: string[]) {
    const tempFav: Coin[] = [];
    favorites.forEach((fav) => {
      tempFav.push(this.coins.find((coin) => coin.CoinInfo.Name.toLowerCase() === fav.toLowerCase()));
    });
    this.favoriteCoins = tempFav;
    console.log('FAVORITE COINS');
    console.log(this.favoriteCoins);
    console.log('FAVORITE COINS');
  }

  // remove a users favorite coins
  removeFavorite(coin: Coin) {
    // alert(`Remove ${coin.CoinInfo.Name} from favorites`);
    // let tempFavs = this.user.favorite_coins;

    // tempFavs = tempFavs.filter((fav) => fav.toLowerCase() !== coin.CoinInfo.Name.toLowerCase());
    this.userService.removeFavorite(coin.CoinInfo.Name.toLowerCase());
  }
}
