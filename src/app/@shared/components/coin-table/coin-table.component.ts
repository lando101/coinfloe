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
import { Coin } from 'src/models/coins.model';
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
  volume24h: number;
  volume24hUSD: number;
  mrktcap: number;
  supply: number;
  rating: string;
  high?: number;
  low?: number;
  favorite?: boolean;
}

export interface ChipFilters {
  name: string;
  width?: number;
  direction?: number;
  active: boolean;
  key: string;
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
  coinFilteredData: CoinTableData[] = [];
  selectedChip: ChipFilters;
  show = false;
  clientWidth: string;
  showChips = false;
  slideConfig = {
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 914,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 699,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
    // autoplay: true,
    // autoplaySpeed: 7000,
  };
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
    { name: '24h Change', width: 136.35, direction: 0, active: false, key: 'return24h' },
    { name: '24h Volume', width: 139.33, direction: 0, active: false, key: 'volume24hUSD' },
    { name: 'Weiss Rating', width: 143.75, direction: 0, active: false, key: 'rating' },
  ];

  constructor(private bottomSheetService: BottomSheetService, private orderBy: OrderByPipe) {}

  addSlide() {
    // this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.coins?.currentValue?.length > 0) {
      // this.getClientWidth(true);

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
      this.coinFilteredData = this.coinData;
      // console.log('TABLE DATA');
      // console.log(this.coinData);
      // console.log('TABLE DATA');
      // console.log(this.coinData);
      this.dataSource = new MatTableDataSource(this.coinFilteredData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.show = true;
      }, 1);
    }
  }

  // gets client width to determine width of chips carousel
  getClientWidth(pageLoad: boolean) {
    this.showChips = false;
    const wait = pageLoad ? 350 : 2100;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const width = document.getElementById('chartContainer').clientWidth - 14;
        if (width) {
          this.clientWidth = `${width - 14}px`;
          resolve(width);
        } else {
          this.clientWidth = '0px';
          reject(width);
        }
      }, wait);
    })
      .then(() => {
        setTimeout(() => {
          this.showChips = true;
        }, 100);
      })
      .catch(() => {
        this.showChips = false;
      });
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

  openBottomSheet(coin: CoinTableData) {
    const viewCoin = this.coins.find((x) => x.CoinInfo.Name === coin.symbol);
    this.bottomSheetService.setState(true, viewCoin);
  }

  order(chip: ChipFilters) {
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
      this.selectedChip = null;

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
    console.log(this.coinFilteredData);
  }
}
