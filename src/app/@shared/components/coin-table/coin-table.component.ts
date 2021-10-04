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
  ElementRef,
} from '@angular/core';
import { Coin, CoinCG } from 'src/models/coins.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { BottomSheetService } from '@app/services/bottom-sheet.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderByPipe } from 'ngx-pipes';
import { Chip } from '../crypto-chart/crypto-chart.component';

export interface CoinTableData {
  name: string;
  symbol: string;
  imgUrl?: string;
  prettyImg?: string;
  price: number;
  returnPct24h: number;
  return24h: number;
  returnPct7d: number;
  returnPct30d: number;
  volume24h: number;
  volume24hUSD: number;
  mrktcap: number;
  supply: number;
  rating: string;
  high?: number;
  low?: number;
  rank?: any;
  favorite?: boolean;
}

export interface ChipFilters {
  name: string;
  width?: number;
  direction?: number;
  active: boolean;
  key: string | number;
}

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.scss'],
  providers: [OrderByPipe],
})
export class CoinTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'name',
    'price',
    '24h',
    // 'amountChange24h',
    '7d',
    '30d',
    'volume24h',
    'marketcap',
    // 'supply',
    'range',
  ];
  dataSource: MatTableDataSource<CoinTableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() loading: boolean;
  @Input() coins: CoinCG[];
  @Input() theme: string;
  @Input() count: number;
  @Input() fullView = true;
  @Output() addFavOutput = new EventEmitter<CoinCG>();
  @Output() removeFavOutput = new EventEmitter<Coin>();

  coinData: CoinTableData[] = [];
  coinFilteredData: CoinTableData[] = [];
  selectedChip: ChipFilters;
  show = false;
  clientWidth: string;
  showChips = false;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 260,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      400: {
        items: 2,
        nav: true,
      },
      740: {
        items: 3,
        nav: true,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  chips: ChipFilters[] = [
    { name: 'Favorites', width: 117.8, direction: 0, active: false, key: 'favorite' },
    { name: 'Market Cap', width: 135.3, direction: 1, active: true, key: 'mrktcap' },
    { name: 'Price', width: 89.4, direction: 0, active: false, key: 'price' },
    { name: '24h %', width: 99.75, direction: 0, active: false, key: 'returnPct24h' },
    { name: '7d %', width: 99.75, direction: 0, active: false, key: 'returnPct7d' },
    { name: '30d %', width: 99.75, direction: 0, active: false, key: 'returnPct30d' },
    { name: '24h Change', width: 138.35, direction: 0, active: false, key: 'return24h' },
    // { name: '24h Volume', width: 139.33, direction: 0, active: false, key: 'volume24hUSD' },
    // { name: 'Weiss Rating', width: 143.75, direction: 0, active: false, key: 'rating' },
  ];

  constructor(private bottomSheetService: BottomSheetService, private orderBy: OrderByPipe) {
    this.selectedChip = this.chips[1];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.coins?.currentValue?.length > 0) {
      // this.getClientWidth(true);

      if (!changes?.coins?.previousValue) {
        this.show = false;
      }
      this.coinData = [];
      const coins: CoinCG[] = changes.coins.currentValue.slice(0, this.count || changes?.coins?.currentValue?.length);
      coins.map((coin: CoinCG) => {
        this.coinData.push({
          name: coin.name,
          symbol: coin.symbol,
          imgUrl: coin.image,
          price: coin.current_price,
          returnPct24h: coin.price_change_percentage_24h,
          return24h: coin.price_change_24h,
          returnPct7d: coin.price_change_percentage_7d_in_currency,
          returnPct30d: coin.price_change_percentage_30d_in_currency,
          volume24hUSD: coin.total_volume,
          volume24h: 0,
          mrktcap: coin.market_cap,
          supply: coin.total_supply || null,
          rating: '-',
          high: coin.high_24h,
          low: coin.low_24h,
          rank: coin.market_cap_rank,
          // favorite: data.FAVORITE,
          favorite: false,
        });
      });
      this.coinFilteredData = this.coinData;

      this.dataSource = new MatTableDataSource(this.coinFilteredData);
      if (this.fullView) {
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.show = true;
        }, 1);
      } else {
        this.show = true;
      }
    }
    // console.log('CHANGE');
  }

  applyFilter(event: Event) {
    // console.log(event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource.filteredData);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleFavorite(selectedCoin: CoinTableData) {
    // const coin: Coin = this.coins.find((x) => x.CoinInfo.Name === selectedCoin.symbol);
    // selectedCoin.favorite = !selectedCoin.favorite;
    // if (coin.FAVORITE) {
    //   this.removeFavorite(coin);
    // } else {
    //   this.addFavorite(coin);
    // }
  }

  addFavorite(coin: Coin) {
    // coin.FAVORITE = true; // assuming db will successfully handle event
    // this.addFavOutput.emit(coin);
  }
  removeFavorite(coin: Coin) {
    coin.FAVORITE = false; // assuming db will successfully handle event
    this.removeFavOutput.emit(coin);
  }

  openBottomSheet(coin: CoinTableData) {
    const viewCoin = this.coins.find((x) => x.symbol === coin.symbol);
    this.bottomSheetService.setState(true, viewCoin);
  }

  order(chip: ChipFilters) {
    this.show = false;
    const key = chip.key;
    const activeChip = this.chips.find((x) => x.active === true);

    if (chip === activeChip) {
      if (activeChip.direction < 3) {
        activeChip.direction = activeChip.direction + 1;
      } else {
        activeChip.direction = 0;
      }
    } else {
      activeChip.active = false;
      activeChip.direction = 0;
      chip.active = true;
      chip.direction = chip.direction + 1;
    }

    if (chip.direction === 1) {
      this.selectedChip = chip;

      this.coinFilteredData = this.orderBy.transform(this.coinData, `-${key}`);
    } else if (chip.direction === 2) {
      this.selectedChip = chip;

      this.coinFilteredData = this.orderBy.transform(this.coinData, `${key}`);
    } else {
      this.selectedChip = this.chips[1];

      const marketCapChip = this.chips.find((x) => x.key === 'mrktcap');
      marketCapChip.active = true;
      marketCapChip.direction = 1;
      this.coinFilteredData = this.orderBy.transform(this.coinData, `-mrktcap`);
    }

    this.dataSource = new MatTableDataSource(this.coinFilteredData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.show = true;
    }, 1);
    // console.log(this.coinFilteredData);
  }
}
