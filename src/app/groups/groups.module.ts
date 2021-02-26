import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  declarations: [GroupsComponent],
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, GroupsRoutingModule],
})
export class GroupsModule {}
