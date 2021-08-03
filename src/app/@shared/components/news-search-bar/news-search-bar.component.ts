import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import * as keywordExtractor from 'keyword-extractor';
import { NewsSource2 } from 'src/models/news.model';

@Component({
  selector: 'app-news-search-bar',
  templateUrl: './news-search-bar.component.html',
  styleUrls: ['./news-search-bar.component.scss'],
})
export class NewsSearchBarComponent implements OnInit {
  @Output() searchString = new EventEmitter<string>();
  @Output() searchResults = new EventEmitter<NewsSource2[]>();
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
    this.extractKeyWords('');
  }

  extractKeyWords(text: string) {
    // console.log(keywordExtractor.default.extract('Landon Messmer went to the store and got a bight to eat'));
    this.keywordsFound = keywordExtractor.default.extract(text, this.keywordParams);
    if (!text) {
      this.resetSearch();
    } else {
      this.searchString.emit(this.searchText);
      // this.search();
    }
  }

  search() {
    const keywords_string = this.keywordsFound.join(',');

    console.log(`Search String: ${keywords_string}`);
    this.searchResults.emit(null);
    this.newsService.getNewsSearch(keywords_string).then((data: NewsSource2[]) => {
      // console.log('NEWS RESULTS');
      // console.log(data);
      // console.log('NEWS RESULTS');
      this.searchResults.emit(data);
    });
  }

  resetSearch() {
    this.searchText = null;
    this.keywordsFound = [];
    this.searchString.emit(this.searchText);
    this.searchResults.emit(null);
  }
}
