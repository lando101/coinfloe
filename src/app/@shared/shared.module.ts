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
import { CoinCardComponent } from './components/coin-card/coin-card.component';
import { NewsTilesComponent } from './components/news-tiles/news-tiles.component';
import { CoinInfoComponent } from './components/coin-info/coin-info.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { CoinCardLoaderComponent } from './components/loaders/coin-card-loader/coin-card-loader.component';
import { NewsLoaderTallComponent } from './components/loaders/news-loader-tall/news-loader-tall.component';
import { NewsLoaderShortComponent } from './components/loaders/news-loader-short/news-loader-short.component';
@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    NgxBootstrapModule,
    PerfectScrollbarModule,
    NgxSkeletonLoaderModule,
    SlickCarouselModule,
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
    CoinInfoComponent,
    NewsSectionComponent,
    CoinCardLoaderComponent,
    NewsLoaderTallComponent,
    NewsLoaderShortComponent,
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
    CoinInfoComponent,
    NewsSectionComponent,
    CoinCardLoaderComponent,
    NewsLoaderTallComponent,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [CoinsListsComponent],
})
export class SharedModule {}
