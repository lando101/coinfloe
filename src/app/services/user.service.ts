import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { CredentialsService } from '@app/auth';
import { User } from 'src/models/user.model';

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

    // console.log(this.credentialService.user$);
    // console.log('USER SERVICE');

    // this.afs
    //   .collection('users', (ref) => ref.where('uid', '==', 'sk3NDltuOwZuEt7ABQxlFgA2WP22'))
    //   .get()
    //   .toPromise()
    //   .then((data: any) => {
    //     console.log('USER SERVICE');
    //     console.log(data);
    //     console.log('USER SERVICE');
    //   })
    //   .catch(() => {
    //     console.log('error');
    //   });

    const result = this.afs.collection('users').doc('TwhkBxiN7vO3Ekndhf9qgIb9OfJ3');

    return uid;
  };
}
