import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { I18nModule } from '@app/i18n';
import { MaterialModule } from '@app/material.module';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';

// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from '@app/@shared';
import { FooterComponent } from './footer/footer.component';
import { AngularTiltModule } from 'angular-tilt';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EventsWidgetComponent } from './events-widget/events-widget.component';
import { FavoritesCoinsWidgetComponent } from './favorites-coins-widget/favorites-coins-widget.component';
import { CoinRatingWidgetComponent } from './coin-rating-widget/coin-rating-widget.component';
import { FavoriteCoinItemComponent } from './cards/favorite-coin-item/favorite-coin-item.component';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
// };

@NgModule({
  imports: [
    // PerfectScrollbarModule,
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AuthModule,
    I18nModule,
    RouterModule,
    SharedModule,
    AngularTiltModule,
  ],
  exports: [],
  declarations: [
    HeaderComponent,
    ShellComponent,
    FooterComponent,
    SideNavComponent,
    EventsWidgetComponent,
    FavoritesCoinsWidgetComponent,
    CoinRatingWidgetComponent,
    FavoriteCoinItemComponent,
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    // },
  ],
})
export class ShellModule {}
