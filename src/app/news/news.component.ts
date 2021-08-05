import { Component, OnInit } from '@angular/core';
import { NewsSourceSearch } from '@app/@shared/components/news-search-bar/news-search-bar.component';
import { NewsService } from '@app/services/news.service';
import { ThemeService } from '@app/services/theme.service';
import { UserService } from '@app/services/user.service';
import { NewsSource2 } from 'src/models/news.model';
import { User } from 'src/models/user.model';
interface ChipOption {
  label: string;
  desc: string;
  active: boolean;
  type: string;
  url: string;
}
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  user: User;
  theme: string;
  searchText: string;
  activeRecentSearch: string;
  searchResults: NewsSource2[] = null;
  topicResults: NewsSource2[] = null;
  selectedChip: ChipOption = { label: 'All', active: true, desc: '', type: null, url: null };
  chips: ChipOption[] = [
    { label: 'All', active: true, desc: '', type: null, url: null },
    { label: 'Bitcoin', active: false, desc: "Bitcoin's latest news", type: 'coin', url: 'btc' },
    { label: 'Ethereum', active: false, desc: "Ethereum's latest news", type: 'coin', url: 'eth' },
    { label: 'Mining', active: false, desc: 'Latest mining news', type: 'topic', url: 'Mining' },
    { label: 'NFTs', active: false, desc: 'Latest news about NFTs', type: 'topic', url: 'NFT' },
    { label: 'Taxes', active: false, desc: 'Latest news about taxes', type: 'topic', url: 'Taxes' },
    {
      label: 'Technical Analysis',
      active: false,
      desc: 'Technical Analysislatest news',
      type: 'topic',
      url: 'Tanalysis',
    },
    { label: 'Upgrades', active: false, desc: 'Latest news in upgrades', type: 'topic', url: 'Upgrade' },
    { label: 'Whales', active: false, desc: 'Latest news about crypto whales', type: 'topic', url: 'Whales' },
  ];

  constructor(private themeService: ThemeService, private newsService: NewsService, private userService: UserService) {}

  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string) => {
      this.theme = data;
    });
    this.userService.user$.subscribe({
      next: (user: User) => (this.user = user),
      error: () => (this.user = null),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  // receiving from news search component :: output method
  updateNewsResults(results: NewsSourceSearch) {
    console.log('GOT RESULTS');
    console.log(results);
    console.log('GOT RESULTS');
    if (!!results && !!this.user) {
      this.searchResults = results.results;
      let userSearches: string[] = this.user.recent_search;

      const searchDuplicate = userSearches.findIndex((x) => results.search_string === x);
      if (searchDuplicate) {
        // already searched term :: removing first instance and adding new
        userSearches = userSearches.filter((x) => x !== results.search_string);
        userSearches.push(results.search_string);
        this.userService.updateUser(this.user.uid, 'recent_search', userSearches);
      } else {
        userSearches.push(results.search_string);
        this.userService.updateUser(this.user.uid, 'recent_search', userSearches);
      }
    } else {
      this.searchResults = null;
    }
  }

  // set variable to trigger action in news search bar component
  search_recent(search: string) {
    this.activeRecentSearch = search;
  }

  // delete a recent search
  removeRecentSearch(search: string) {
    let userSearches: string[] = this.user.recent_search;
    userSearches = userSearches.filter((x) => x !== search);
    this.user.recent_search = userSearches; // anticipating DB successfully deleting search
    this.userService.updateUser(this.user.uid, 'recent_search', userSearches);
  }

  // triggers getting news based on chip type & topic
  chipSelection(chip: ChipOption) {
    this.selectedChip = chip;
    this.topicResults = null; // reset news for child
    if (chip.type === 'topic') {
      // use topic api
      this.newsService
        .getTopicNews(chip.url)
        .then((data: NewsSource2[]) => {
          this.topicResults = data;
        })
        .catch(() => {
          this.topicResults = [];
        });
    } else if (chip.type === 'coin') {
      // use coin news api
      this.newsService
        .getCoinNews(chip.url)
        .then((data: NewsSource2[]) => {
          this.topicResults = data;
        })
        .catch(() => {
          this.topicResults = [];
        });
    } else {
      // use generic api
    }
  }
}
