import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, FontAwesomeModule],
})
export class NewsModule {}
