import { Component, OnInit } from '@angular/core';
import { NewsService } from '@app/services/news.service';
import { ThemeService } from '@app/services/theme.service';
import { NewsSource2 } from 'src/models/news.model';
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
  theme: string;
  searchText: string;
  searchResults: NewsSource2[] = null;
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

  constructor(private themeService: ThemeService, private newsService: NewsService) {}

  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string) => {
      this.theme = data;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  // receiving from news search component
  updateNewsResults(results: NewsSource2[]) {
    console.log('GOT RESULTS');
    console.log(results);
    console.log('GOT RESULTS');
    this.searchResults = results || null;
  }

  chipSelection(chip: ChipOption) {
    this.selectedChip = chip;
    if (chip.type === 'topic') {
    } else if (chip.type === 'coin') {
    } else {
    }
  }
}
