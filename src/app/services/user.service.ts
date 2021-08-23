import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { CredentialsService } from '@app/auth';
import { User } from 'src/models/user.model';
import { Coin } from 'src/models/coins.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = null;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private credentialService: CredentialsService, private afs: AngularFirestore) {
    this.credentialService.user$.subscribe({
      next: (user: User) => {
        if (!!user) {
          if (!!this.user) {
            if (user.uid === this.user.uid) {
              this.user = user;
            }
          } else {
            this.user = user;
            this.updateUser(this.user.uid, 'signed_in', new Date());
          }
          this.user$.next(user);
        }
      },
      error: (Error) => {
        this.user = null;
      },
    });
    // this.updateUser(this.user);
  }

  // update user info
  updateUser = (uid?: number | string, property?: string, value?: any) => {
    let user_fb: any;
    console.log(uid);

    if (!!uid) {
      user_fb = this.afs
        .collection('users')
        .doc(uid.toString())
        .update({ [property]: value });
    } else {
      user_fb = this.afs
        .collection('users')
        .doc(this.user.uid.toString())
        .update({ [property]: value });
    }

    const result = this.afs.collection('users').doc('TwhkBxiN7vO3Ekndhf9qgIb9OfJ3');

    return uid;
  };

  // remove coin favorite
  removeFavorite = (coin: string) => {
    let tempFavs = this.user.favorite_coins;

    tempFavs = tempFavs.filter((fav) => fav.toLowerCase() !== coin.toLowerCase());
    this.updateUser(this.user.uid, 'favorite_coins', tempFavs);
  };

  // add coin favorite
  addFavorite = (coin: string) => {
    const tempFavs = this.user.favorite_coins;
    tempFavs.push(coin.toUpperCase());
    this.updateUser(this.user.uid, 'favorite_coins', tempFavs);
  };
}
