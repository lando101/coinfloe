import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import { UserService } from '@app/services/user.service';
import * as keywordExtractor from 'keyword-extractor';
import { NewsSource2 } from 'src/models/news.model';
import { User } from 'src/models/user.model';

export interface NewsSourceSearch {
  results: NewsSource2[];
  search_string: string;
}
@Component({
  selector: 'app-news-search-bar',
  templateUrl: './news-search-bar.component.html',
  styleUrls: ['./news-search-bar.component.scss'],
})
export class NewsSearchBarComponent implements OnInit {
  @Input() recent_search: string;
  @Output() searchString = new EventEmitter<string>();
  @Output() searchResults = new EventEmitter<NewsSourceSearch>();
  user: User = null;
  searchText: string;
  keywordsFound: string[] = [];
  keywordParams: any = {
    language: 'english',
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: true,
  };
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.extractKeyWords('').catch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    const search = changes.recent_search.currentValue;
    const lastSearch = changes.recent_search.previousValue;
    if (!!search) {
      if (search !== lastSearch) {
        this.search_recent(search);
      }
    }
  }

  extractKeyWords(text: string) {
    // console.log(keywordExtractor.default.extract('Landon Messmer went to the store and got a bight to eat'));
    const promise = new Promise((resolve, reject) => {
      this.keywordsFound = keywordExtractor.default.extract(text, this.keywordParams);
      if (!text) {
        this.resetSearch();
        // reject('There is no search text');
      } else {
        this.searchString.emit(this.searchText);
        resolve(this.searchText);
        // this.search();
      }
    });
    return promise;
  }

  search() {
    const keywords_string = this.keywordsFound.join(',');

    // console.log(`Search String: ${keywords_string}`);
    this.searchResults.emit(null);
    this.newsService.getNewsSearch(keywords_string).then((data: NewsSource2[]) => {
      const result: NewsSourceSearch = {
        results: data,
        search_string: this.searchText,
      };
      // console.log('NEWS RESULTS');
      // console.log(data);
      // console.log('NEWS RESULTS');
      this.searchResults.emit(result);
    });
  }

  // when user select an existing search from their history
  search_recent(search: string) {
    this.extractKeyWords(search)
      .then(() => {
        this.searchText = search;
        this.search();
      })
      .catch(() => this.resetSearch());
  }

  resetSearch() {
    this.searchText = null;
    this.keywordsFound = [];
    this.searchString.emit(this.searchText);
    this.searchResults.emit(null);
  }
}
