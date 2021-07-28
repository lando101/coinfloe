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
    this.newsService._generalNews.subscribe((data) => {
      console.log('NEWS LIST');
      console.log(data);
      console.log('NEWS LIST');
      this.news = data;
    });
  }
}
