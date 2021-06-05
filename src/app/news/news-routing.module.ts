import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { NewsComponent } from './news.component';

// const routes: Routes = [{ path: '', component: NewsComponent }];
const routes: Routes = [{ path: '', component: NewsComponent, data: { title: marker('News') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
