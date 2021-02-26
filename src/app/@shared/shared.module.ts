import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { CoinsListsComponent } from './coins-lists/coins-lists.component';
import { CoinItemComponent } from './coin-item/coin-item.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, CoinsListsComponent, CoinItemComponent],
  exports: [LoaderComponent, CoinsListsComponent, CoinItemComponent],
})
export class SharedModule {}
