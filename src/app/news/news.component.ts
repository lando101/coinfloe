import { Component, OnInit } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  theme: string;
  searchText: string;
  constructor(private themeService: ThemeService, private newsService: NewsService) {}

  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string) => {
      this.theme = data;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
