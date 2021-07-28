import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BlockChainInfo, Coin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { NewsSource2 } from 'src/models/news.model';
import { async } from 'rxjs/internal/scheduler/async';
import { BehaviorSubject, Observable } from 'rxjs';

const routes = {
  allNewsSource2: () => '/news/all-news',
};

export interface NewsQuery {
  symbol?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  _generalNews: BehaviorSubject<any> = new BehaviorSubject<any>(null); // subscribe for price data

  private _news: NewsSource2 | null = null;
  constructor(private _httpClient: HttpClient) {}

  getAllNews2(): Observable<any> {
    this._generalNews.next(null);
    const result = this._httpClient.get(routes.allNewsSource2());
    result.subscribe({
      next: (data: any) => {
        this._generalNews.next(data.data.data);
      },
      error: (error) => {
        this._generalNews.next(null);
      },
    });
    // result.pipe(
    //   map((data: any) => {
    //     this._generalNews.next(data); // doing this to limit api calls
    //   })
    // );
    return result;
  }

  // get news(): NewsSource2[] | null {
  //   let newsResults: NewsSource2[] = [];
  //   this._httpClient.get(routes.allNewsSource2()).subscribe({
  //     next: (data: any) => {
  //       // console.log('NEW NEWS SERVICE');
  //       // console.log(data.data.data);
  //       newsResults = data.data.data;
  //       return newsResults;
  //       // console.log('NEW NEWS SERVICE');
  //     },
  //   });
  // }
}
