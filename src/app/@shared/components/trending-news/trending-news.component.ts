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
  allNewsS2: NewsSource2[];

  customOptions: OwlOptions = {
    items: 4,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 260,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      400: {
        items: 2,
        nav: true,
      },
      740: {
        items: 3,
        nav: true,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 14000,
    responsive: [
      {
        breakpoint: 2250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 1860,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
    console.log(e);
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }

  constructor(private cryptoDataService: CryptoDataServiceService, private newService: NewsService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      // doing this for better page load performance
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
    }, 500);
  }
}
