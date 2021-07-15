import { Component, Input, OnInit } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { NewsService } from '@app/services/news.service';
import { NewsSource2 } from 'src/models/news.model';

@Component({
  selector: 'app-trending-news',
  templateUrl: './trending-news.component.html',
  styleUrls: ['./trending-news.component.scss'],
})
export class TrendingNewsComponent implements OnInit {
  @Input() theme: string;
  allNewsS2: NewsSource2[];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 14000,
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(private cryptoDataService: CryptoDataServiceService, private newService: NewsService) {}

  ngOnInit(): void {
    this.newService.getAllNews2().subscribe({
      next: (data) => {
        console.log('NEWS TILE');
        this.allNewsS2 = data.data.data;
        console.log(this.allNewsS2);
        console.log('NEWS TILE');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
