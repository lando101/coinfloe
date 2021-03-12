import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { CoinsListsComponent } from './coins-lists/coins-lists.component';
import { CoinItemComponent } from './coin-item/coin-item.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BottomSheetCustomComponent } from './bottom-sheet-custom/bottom-sheet-custom.component';
import { SearchComponent } from './search/search.component';
import { NgxBootstrapModule } from '@app/ngx-bootstrap.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NotificationsMenuComponent } from './notifications-menu/notifications-menu.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoinItemLoaderComponent } from './coin-item-loader/coin-item-loader.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    NgxBootstrapModule,
    PerfectScrollbarModule,
    NgxSkeletonLoaderModule,
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
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [CoinsListsComponent],
})
export class SharedModule {}
