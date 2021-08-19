import { Component, Input, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { Coin } from 'src/models/coins.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface CoinTableData {
  name: string;
  symbol: string;
  imgUrl?: string;
  prettyImg?: string;
  price: number;
  returnPct24h: number;
  return24h: number;
  volume24h: number;
  mrktcap: number;
  supply: number;
  rating: string;
  high?: number;
  low?: number;
}

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.scss'],
})
export class CoinTableComponent implements OnChanges {
  displayedColumns: string[] = [
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

  coinData: CoinTableData[] = [];
  show = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.show = false;
    if (changes.coins.currentValue.length > 0) {
      const coins: Coin[] = changes.coins.currentValue;
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
            volume24h: data.RAW.USD.TOTALVOLUME24H,
            mrktcap: data.RAW.USD.MKTCAP,
            supply: data.RAW.USD.SUPPLY,
            rating: data.CoinInfo.Rating.Weiss.TechnologyAdoptionRating || '-',
            high: data.RAW.USD.HIGH24HOUR,
            low: data.RAW.USD.LOW24HOUR,
          });
        }
      });
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
}
