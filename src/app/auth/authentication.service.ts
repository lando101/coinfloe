import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/models/user.model';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth, private credentialsService: CredentialsService) {}

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
    // if (method === 'email') {
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
    // }
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
