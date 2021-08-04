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
  constructor(private credentialService: CredentialsService, private afs: AngularFirestore) {
    credentialService.user$.subscribe({
      next: (user: User) => {
        this.user = user;
        // this.updateUser(this.user);
      },
      error: (Error) => {
        this.user = null;
      },
    });
    // this.updateUser(this.user);
  }

  updateUser = (user?: User) => {
    const tempUser = user || this.user;
    // console.log('USER SERVICE');
    // console.log(tempUser);
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

    // const result = this.afs
    //   .collection('users')
    //   .doc('TwhkBxiN7vO3Ekndhf9qgIb9OfJ3')
    //   .set

    return user;
  };
}
