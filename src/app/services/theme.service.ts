import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeTypeBS: BehaviorSubject<any> = new BehaviorSubject<string>('light');

  constructor(private cookieService: CookieService) {
    let theme = this.cookieService.get('theme');
    if (theme) {
      this.setTheme(theme);
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: string) {
    this.themeTypeBS.next(theme);
    this.setThemeCookie(theme);
  }

  getTheme(): Observable<any> {
    return of(this.themeTypeBS);
  }

  // getThemeCookie(key: string) {
  //   let theme = this.cookieService.get(key);

  //   this.themeTypeBS.next(theme);
  // }

  setThemeCookie(themeString: string) {
    this.cookieService.put('theme', themeString);
  }
}
