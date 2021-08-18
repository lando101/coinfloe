import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { CoinsListsComponent } from './components/coins-lists/coins-lists.component';
import { CoinItemComponent } from './components/coin-item/coin-item.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BottomSheetCustomComponent } from './components/bottom-sheet-custom/bottom-sheet-custom.component';
import { SearchComponent } from './components/search/search.component';
import { NgxBootstrapModule } from '@app/ngx-bootstrap.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { NotificationsMenuComponent } from './components/notifications-menu/notifications-menu.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoinItemLoaderComponent } from './components/loaders/coin-item-loader/coin-item-loader.component';
import { CryptoChartComponent } from './components/crypto-chart/crypto-chart.component';
import { LoaderCircleComponent } from './components/loader-circle/loader-circle.component';
import { TopGainersComponent } from './components/top-gainers/top-gainers.component';
import { TopLosersComponent } from './components/top-losers/top-losers.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CoinCardComponent } from './components/cards/coin-card/coin-card.component';
import { NewsTilesComponent } from './components/news-tiles/news-tiles.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { CoinCardLoaderComponent } from './components/loaders/coin-card-loader/coin-card-loader.component';
import { NewsLoaderTallComponent } from './components/loaders/news-loader-tall/news-loader-tall.component';
import { NewsLoaderShortComponent } from './components/loaders/news-loader-short/news-loader-short.component';
import { CryptoInfoComponent } from './components/crypto-info/crypto-info.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faEthereum, faGithub, faMedium, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { TrendingNewsComponent } from './components/trending-news/trending-news.component';
import { NewsCardComponent } from './components/cards/news-card/news-card.component';
import { AngularTiltModule } from 'angular-tilt';
import { HighLowProgressComponent } from './components/high-low-progress/high-low-progress.component';
import { AvatarModule } from 'ngx-avatar';
import { CreateAccountDialogComponent } from './components/create-account-dialog/create-account-dialog.component';
import { FullScreenSearchComponent } from './components/full-screen-search/full-screen-search.component';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsListItemComponent } from './components/cards/news-list-item/news-list-item.component';
import { NewsCardLoaderComponent } from './components/loaders/news-card-loader/news-card-loader.component';
import { NewsSearchBarComponent } from './components/news-search-bar/news-search-bar.component';
import { CoinMarqueeItemComponent } from './components/cards/coin-marquee-item/coin-marquee-item.component';
import { CoinTableComponent } from './components/coin-table/coin-table.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    NgxBootstrapModule,
    PerfectScrollbarModule,
    NgxSkeletonLoaderModule,
    SlickCarouselModule,
    AngularTiltModule,
    AvatarModule,
    FormsModule,
    MomentModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59,
      },
    }),
  ],
  declarations: [
    LoaderComponent,
    CoinsListsComponent,
    CoinItemComponent,
    CoinDetailsComponent,
    BottomSheetCustomComponent,
    SearchComponent,
    ProfileMenuComponent,
    NotificationsMenuComponent,
    CoinItemLoaderComponent,
    CryptoChartComponent,
    CryptoChartComponent,
    LoaderCircleComponent,
    TopGainersComponent,
    TopLosersComponent,
    CoinCardComponent,
    NewsTilesComponent,
    NewsSectionComponent,
    CoinCardLoaderComponent,
    NewsLoaderTallComponent,
    NewsLoaderShortComponent,
    CryptoInfoComponent,
    TrendingNewsComponent,
    NewsCardComponent,
    HighLowProgressComponent,
    CreateAccountDialogComponent,
    FullScreenSearchComponent,
    NewsListComponent,
    NewsListItemComponent,
    NewsCardLoaderComponent,
    NewsSearchBarComponent,
    CoinMarqueeItemComponent,
    CoinTableComponent,
  ],
  exports: [
    LoaderComponent,
    CoinsListsComponent,
    CoinItemComponent,
    CoinDetailsComponent,
    BottomSheetCustomComponent,
    SearchComponent,
    ProfileMenuComponent,
    NotificationsMenuComponent,
    CoinItemLoaderComponent,
    CryptoChartComponent,
    LoaderCircleComponent,
    TopGainersComponent,
    TopLosersComponent,
    CoinCardComponent,
    NewsTilesComponent,
    NewsSectionComponent,
    CoinCardLoaderComponent,
    NewsLoaderTallComponent,
    CryptoInfoComponent,
    TrendingNewsComponent,
    NewsCardComponent,
    HighLowProgressComponent,
    CreateAccountDialogComponent,
    FullScreenSearchComponent,
    NewsListComponent,
    NewsListItemComponent,
    NewsCardLoaderComponent,
    NewsSearchBarComponent,
    CoinMarqueeItemComponent,
    CoinTableComponent,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [CoinsListsComponent],
})
export class SharedModule {}
