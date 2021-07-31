import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import { NewsSource2 } from 'src/models/news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  @Input() theme: string;
  @Input() title: string;
  @Input() description: string;
  @Input() use_api: boolean = null; // don't want to load data when using to replace larger component
  @Input() newsFromParent: NewsSource2[];
  @Input() show: number;
  @Input() start: number;
  @Input() end: number;

  news: NewsSource2[];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    // this.newsService._generalNews.subscribe({
    //   next: (data: any) => {
    //     console.log('NEWS LIST');
    //     console.log(data);
    //     console.log('NEWS LIST');
    //     this.news = data;
    //   },
    //   error: (error) => {
    //     console.log('error getting news');
    //   },
    // });
    if (this.use_api == null || true) {
      this.getGeneralNews();
    }
  }

  getGeneralNews() {
    this.newsService._generalNews.subscribe((data) => {
      console.log('NEWS LIST');
      console.log(data);
      console.log('NEWS LIST');
      this.news = data;
    });

    // this.newsService._generalNews.subscribe().toPromise().then((data: any) => {
    //   this.news = data;
    // });
  }
}
