import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BlockChainInfo, Coin } from 'src/models/coins.model';
import { NewsSource1 } from 'src/models/news.model';
import { NewsSource2 } from 'src/models/news.model';
import { async } from 'rxjs/internal/scheduler/async';
import { BehaviorSubject, Observable } from 'rxjs';

interface NewsParams {
  keywords: string;
  topic?: string;
  category?: string;
}

export interface NewsQuery {
  symbol?: string;
}

const routes = {
  allNewsSource2: () => '/news/all-news',
  searchNews: (c: NewsParams) => `/news/search/${c.keywords}`,
};

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
    return result;
  }

  // finds news based on keywords
  getNewsSearch(searchString: string) {
    const params: NewsParams = {
      keywords: searchString,
    };

    let promise = new Promise((resolve, reject) => {
      this._httpClient
        .get(routes.searchNews(params))
        .toPromise()
        .then((data: any) => {
          const result: NewsSource2 = data.data.data;
          resolve(result);
        })
        .catch(() => {
          reject('ERROR GETTING NEWS');
        });
    });

    return promise;
  }
}
