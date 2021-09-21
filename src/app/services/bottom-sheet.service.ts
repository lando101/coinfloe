import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Coin, CoinCG } from 'src/models/coins.model';

@Injectable({
  providedIn: 'root',
})
export class BottomSheetService {
  bottomSheetShow: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  coin: BehaviorSubject<any> = new BehaviorSubject<CoinCG>(null);

  constructor() {}

  setState(show: boolean, coin?: CoinCG) {
    this.bottomSheetShow.next(show);
    this.coin.next(coin);
  }
}
