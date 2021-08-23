import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';

export interface CoinTableData {
  name: string;
  symbol: string;
  imgUrl?: string;
  prettyImg?: string;
  price: number;
  returnPct24h: number;
  return24h: number;
  volume24h: number;
  volume24hUSD: number;
  mrktcap: number;
  supply: number;
  rating: string;
  high?: number;
  low?: number;
  favorite?: boolean;
}

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.scss'],
})
export class CoinTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'favorite',
    'name',
    'price',
    '24h',
    'amountChange24h',
    'volume24h',
    'marketcap',
    'supply',
    'rating',
    'range',
  ];
  dataSource: MatTableDataSource<CoinTableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() loading: boolean;
  @Input() coins: Coin[];
  @Input() theme: string;
  @Input() count: number;
  @Output() addFavOutput = new EventEmitter<Coin>();
  @Output() removeFavOutput = new EventEmitter<Coin>();

  coinData: CoinTableData[] = [];
  show = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.coins?.currentValue?.length > 0) {
      if (!changes?.coins?.previousValue) {
        this.show = false;
      }
      this.coinData = [];
      const coins: Coin[] = changes.coins.currentValue;
      // console.log('TABLE');
      // console.log(coins);
      // console.log('TABLE');
      coins.map((data: Coin) => {
        if (!!data.RAW?.USD) {
          this.coinData.push({
            name: data.CoinInfo.FullName,
            symbol: data.CoinInfo.Name,
            imgUrl: `https://www.cryptocompare.com${data.CoinInfo.ImageUrl}`,
            prettyImg: `https://cryptologos.cc/logos/${data.CoinInfo?.FullName.replace(
              ' ',
              '-'
            ).toLowerCase()}-${data.CoinInfo?.Name.toLowerCase()}-logo.png?v=010`,
            price: data.RAW.USD.PRICE,
            returnPct24h: data.RAW.USD.CHANGEPCT24HOUR,
            return24h: data.RAW.USD.CHANGE24HOUR,
            volume24hUSD: data.RAW.USD.TOTALVOLUME24HTO,
            volume24h: data.RAW.USD.TOTALVOLUME24H,
            mrktcap: data.RAW.USD.MKTCAP,
            supply: data.RAW.USD.SUPPLY,
            rating: data.CoinInfo.Rating.Weiss.TechnologyAdoptionRating || '-',
            high: data.RAW.USD.HIGH24HOUR,
            low: data.RAW.USD.LOW24HOUR,
            favorite: data.FAVORITE,
          });
        }
      });
      // console.log('TABLE DATA');
      // console.log(this.coinData);
      // console.log('TABLE DATA');
      // console.log(this.coinData);
      this.dataSource = new MatTableDataSource(this.coinData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.show = true;
      }, 1);
    }
  }

  applyFilter(event: Event) {
    console.log(event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleFavorite(selectedCoin: CoinTableData) {
    const coin: Coin = this.coins.find((x) => x.CoinInfo.Name === selectedCoin.symbol);
    selectedCoin.favorite = !selectedCoin.favorite;
    if (coin.FAVORITE) {
      this.removeFavorite(coin);
    } else {
      this.addFavorite(coin);
    }
  }

  addFavorite(coin: Coin) {
    coin.FAVORITE = true; // assuming db will successfully handle event
    this.addFavOutput.emit(coin);
  }
  removeFavorite(coin: Coin) {
    coin.FAVORITE = false; // assuming db will successfully handle event
    this.removeFavOutput.emit(coin);
  }
}
