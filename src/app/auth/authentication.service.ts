import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface CreateContext {
  newUsername: string;
  email: string;
  newPassword: string;
  passwordVerify: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth,
    private credentialsService: CredentialsService,
    private afs: AngularFirestore
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext, method: string): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: '',
      token: '',
    };
    if (method === 'email') {
      return from(this.afAuth.signInWithEmailAndPassword(context.username, context.password)).pipe(
        map((result: any) => {
          console.log('EMAIL LOGIN');
          console.log(result);
          console.log('EMAIL LOGIN');
          const uid = result.user.uid;
          const cred = {
            username: result.user.email,
            token: result.user.refreshToken,
            uid: result.user.uid,
          };
          this.credentialsService.setCredentials(cred, context.remember);
          return cred;
        })
      );
    } else if (method === 'google') {
      return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
        map((result: any) => {
          console.log('GOOGLE AUTH');
          console.log(result);
          console.log('GOOGLE AUTH');
          const cred = {
            username: result.user,
            token: result.user.refreshToken,
            uid: result.user.uid,
          };
          this.afs
            .collection('users', (ref) => ref.where('uid', '==', cred.uid))
            .valueChanges()
            .subscribe((user: any) => {
              console.log('check if user exists');
              console.log(user);
              console.log('check if user exists');
              if (user.length < 1) {
                // creating user account
                this.createUserDB(null, result, true);
              }
            });
          this.credentialsService.setCredentials(cred, context.remember);
          return cred;
        })
      );

      // return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
      //   map((result: any) => {
      //     console.log('GOOGLE AUTH');
      //     console.log(result);
      //     console.log('GOOGLE AUTH');
      //     const cred = {
      //       username: result.user,
      //       token: result.user.refreshToken,
      //       uid: result.user.uid,
      //     };
      //     this.credentialsService.setCredentials(cred, context.remember);

      //     return cred;
      //   })
      // );
    }
  }

  createAccount(context: CreateContext, method: string): Observable<any> {
    console.log('AUTH SERVICE');
    console.log(context);
    console.log('AUTH SERVICE');
    if (method === 'email') {
      return from(this.afAuth.createUserWithEmailAndPassword(context.email, context.passwordVerify)).pipe(
        map((result: any) => {
          console.log('New Account Firebase Response');
          console.log(result);
          console.log('New Account Firebase Response');
          this.createUserDB(context, result, false);
          // this.afs.collection('users').add({
          //   // add new user to db
          //   active: true,
          //   created: new Date(),
          //   email: context.email,
          //   email_verified: result.user.emailVerified,
          //   favorite_articles: [],
          //   favorite_coins: [],
          //   followers_count: 0,
          //   groups: [],
          //   img: '',
          //   phone: '',
          //   signed_in: new Date(),
          //   theme: 'light',
          //   uid: result.user.uid,
          //   username: context.newUsername,
          // });
          return result;
        })
      );
    } else if (method === 'google') {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: any) => {
        console.log('created account with google');
        console.log(data);
        console.log('created account with google');
      });
    }
  }

  // adds user to firebase users collection
  createUserDB(context: CreateContext, result: any, google: boolean) {
    if (!google) {
      this.afs.collection('users').add({
        // add new user to db
        active: true,
        created: new Date(),
        email: context.email,
        email_verified: result.user.emailVerified,
        favorite_articles: [],
        favorite_coins: [],
        followers_count: 0,
        groups: [],
        img: '',
        phone: '',
        signed_in: new Date(),
        theme: 'light',
        uid: result.user.uid,
        username: context.newUsername,
      });
    } else if (google) {
      this.afs.collection('users').add({
        // add new user to db
        active: true,
        created: new Date(),
        email: result.user.email,
        email_verified: result.user.emailVerified,
        favorite_articles: [],
        favorite_coins: [],
        followers_count: 0,
        groups: [],
        img: result.user.photoURL,
        phone: result.user.phoneNumber,
        signed_in: new Date(),
        theme: 'light',
        uid: result.user.uid,
        username: result.user.displayName,
      });
    }
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.afAuth.signOut();
    return of(true);
  }
}
