import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as keywordExtractor from 'keyword-extractor';

@Component({
  selector: 'app-news-search-bar',
  templateUrl: './news-search-bar.component.html',
  styleUrls: ['./news-search-bar.component.scss'],
})
export class NewsSearchBarComponent implements OnInit {
  @Output() searchString = new EventEmitter<string>();
  searchText: string;
  keywordsFound: string[] = [];
  keywordParams: any = {
    language: 'english',
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: true,
  };
  constructor() {}

  ngOnInit(): void {
    this.extractKeyWords('');
  }

  extractKeyWords(text: string) {
    // console.log(keywordExtractor.default.extract('Landon Messmer went to the store and got a bight to eat'));
    this.keywordsFound = keywordExtractor.default.extract(text, this.keywordParams);
    this.searchString.emit(this.searchText);
  }

  resetSearch() {
    this.searchText = null;
    this.keywordsFound = [];
    this.searchString.emit(this.searchText);
  }
}
