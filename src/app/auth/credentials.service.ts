import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  username: string;
  uid: string;
  token: string;
}

const credentialsKey = 'cf_credentials';
const userKey = 'cf_user';
/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  user$: BehaviorSubject<any> = new BehaviorSubject<User>(null); // subscribe for price data
  private _credentials: Credentials | null = null;
  private _user: User | null = null;
  constructor(private afs: AngularFirestore) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      console.log('THERE ARE SAVED CREDENTIALS');
      this.getUser(this._credentials.uid);
    }
    // if (!!savedUser) {
    //   this._user = JSON.parse(savedUser);
    // }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  get user(): User {
    return this._user;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      console.log('there are credentials');
      this.getUser(credentials.uid);
      console.log('there are credentials');
    } else {
      console.log('clearing storage');
      this._user = undefined;
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      console.log('clearing storage');
    }
  }

  // subscribing to changes of the user in firebase :: changes will update in real time
  getUser(uid: string) {
    const result = this.afs
      .collection('users', (ref) => ref.where('uid', '==', uid))
      .valueChanges()
      .subscribe((data: any) => {
        console.log(data);
        this._user = data;
        this.user$.next(this._user);
        // console.log('USER');
        // console.log(this._user);
        // console.log('USER');
      });
  }
}
