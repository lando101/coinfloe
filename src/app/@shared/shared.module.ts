import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { CoinsListsComponent } from './coins-lists/coins-lists.component';
import { CoinItemComponent } from './coin-item/coin-item.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, CoinsListsComponent, CoinItemComponent, CoinDetailsComponent],
  exports: [LoaderComponent, CoinsListsComponent, CoinItemComponent, CoinDetailsComponent],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [CoinsListsComponent],
})
export class SharedModule {}
