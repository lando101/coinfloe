import { Component, Input, OnInit } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';
import { NewsService } from '@app/services/news.service';
import { NewsSource1, NewsSource2 } from 'src/models/news.model';

@Component({
  selector: 'app-news-tiles',
  templateUrl: './news-tiles.component.html',
  styleUrls: ['./news-tiles.component.scss'],
})
export class NewsTilesComponent implements OnInit {
  @Input() theme: string;
  news: NewsSource1[];
  allNewsS2: NewsSource2[];

  slides = [
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
  ];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // autoplay: true,
    // autoplaySpeed: 7000,
  };

  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }
  constructor(private cryptoDataService: CryptoDataServiceService, private newService: NewsService) {}

  ngOnInit(): void {
    this.cryptoDataService.getPopNews();
    this.cryptoDataService.popNewsObs.subscribe((data) => {
      if (data != '' || data != null) {
        this.news = data;
        // console.log('NewsSource1 Tiles');
        // console.log(this.news);
        // console.log('NewsSource1 Tiles');
      }
    });
    this.newService.getAllNews2().subscribe({
      next: (data) => {
        // console.log('NEWS TILE');
        this.allNewsS2 = data.data.data;
        // console.log(this.allNewsS2);
        // console.log('NEWS TILE');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
