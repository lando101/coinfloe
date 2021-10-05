import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { NewsService } from '@app/services/news.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NewsSource2 } from 'src/models/news.model';

@Component({
  selector: 'app-trending-news',
  templateUrl: './trending-news.component.html',
  styleUrls: ['./trending-news.component.scss'],
})
export class TrendingNewsComponent implements AfterViewInit {
  @Input() theme: string;
  @Input() page: string;
  allNewsS2: NewsSource2[];
  isDragging = false;
  startPosition = 0;
  customOptions: OwlOptions = {
    items: 4,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoWidth: true,
    navSpeed: 260,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(private cryptoDataService: CryptoDataServiceService, private newService: NewsService) {}

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   // doing this for better page load performance
    //   this.newService.getAllNews2().subscribe({
    //     next: (data) => {
    //       // console.log('NEWS TILE');
    //       this.allNewsS2 = data.data.data;
    //       // console.log(this.allNewsS2);
    //       // console.log('NEWS TILE');
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
    // }, 500);

    this.newService._generalNews.subscribe({
      next: (news) => {
        this.allNewsS2 = news;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
