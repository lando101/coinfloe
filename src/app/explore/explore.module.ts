import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';

@NgModule({
  declarations: [ExploreComponent],
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, ExploreRoutingModule],
})
export class ExploreModule {}
