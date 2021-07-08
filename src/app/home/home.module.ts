import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MarketCapComponent } from './components/market-cap/market-cap.component';
import { NgPipesModule } from 'ngx-pipes';
import { AppModule } from '@app/app.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    Angulartics2Module,
    HomeRoutingModule,
    NgPipesModule,
    FontAwesomeModule,
  ],
  declarations: [HomeComponent, MarketCapComponent],
})
export class HomeModule {
  constructor() {}
}
