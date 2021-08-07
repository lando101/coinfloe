import { Component, OnInit } from '@angular/core';
import { CoinRating } from 'src/models/coin-rating.model';

@Component({
  selector: 'app-coin-rating-widget',
  templateUrl: './coin-rating-widget.component.html',
  styleUrls: ['./coin-rating-widget.component.scss'],
})
export class CoinRatingWidgetComponent implements OnInit {
  coins: CoinRating[] = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 42000,
      rating: 4.78,
      userRating: null,
      userTags: null,
      username: null,
    },
    {
      id: 'ada',
      name: 'Cardano',
      symbol: 'ADA',
      price: 1.41,
      rating: 4.88,
      userRating: null,
      userTags: null,
      username: null,
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2851,
      rating: 4.43,
      userRating: null,
      userTags: null,
      username: null,
    },
    {
      id: 'vet',
      name: 'VeChain',
      symbol: 'VET',
      price: 0.09,
      rating: 3.97,
      userRating: null,
      userTags: null,
      username: null,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
