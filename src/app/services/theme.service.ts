import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeTypeBS: BehaviorSubject<any> = new BehaviorSubject<string>('light');

  constructor() {}

  setTheme(theme: string) {
    this.themeTypeBS.next(theme);
  }

  getTheme(): Observable<any> {
    return of(this.themeTypeBS);
  }
}
