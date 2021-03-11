import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  sideNavShow: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  constructor() {}

  setState(show: boolean) {
    this.sideNavShow.next(show);
  }
}
