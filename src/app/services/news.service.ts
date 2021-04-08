import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BlockChainInfo, Coin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { NewsSource2 } from 'src/models/news.model';
import { async } from 'rxjs/internal/scheduler/async';
import { Observable } from 'rxjs';

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
  private _news: NewsSource2 | null = null;
  constructor(private _httpClient: HttpClient) {}

  getAllNews2(): Observable<any> {
    return this._httpClient.get(routes.allNewsSource2());
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
