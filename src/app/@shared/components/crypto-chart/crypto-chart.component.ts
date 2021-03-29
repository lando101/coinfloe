import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { createChart, IChartApi, ISeriesApi, LineData, MouseEventHandler, MouseEventParams } from 'lightweight-charts';
import { CoinPriceHistory, PriceDataContainer } from 'src/models/coin-price-history.model';
import { Coin } from 'src/models/coins.model';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { formatCurrency } from '@angular/common';

export interface Chip {
  label?: string;
  type?: string;
  selected?: boolean;
  startDate?: string;
  endDate?: string;
}

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss'],
})
export class CryptoChartComponent implements OnInit {
  @ViewChild('cryptochart', { read: ElementRef }) cryptochart: ElementRef;
  @ViewChild('hoverprice', { read: ElementRef }) divHoverPrice: ElementRef;

  @Input() coin: Coin;
  dateHover: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data
  show: boolean = false;
  width: 0;
  height: 450;
  hoverPrice: number = null;
  params: CryptoQuery = {};

  priceData: PriceDataContainer = {};
  hourlyPriceData: PriceDataContainer = {};
  minutePriceData: PriceDataContainer = {};

  selectedChip: Chip;
  chipList: Chip[] = [
    { label: '1h', type: 'minute', selected: false, startDate: '', endDate: moment().format('L') },
    { label: '24h', type: 'minute', selected: false, startDate: '', endDate: moment().format('L') },
    {
      label: '7d',
      type: 'hourly',
      selected: false,
      startDate: moment().subtract(moment.duration(7, 'd')).format('L'),
      endDate: moment().format('L'),
    },
    {
      label: '30d',
      type: 'hourly',
      selected: false,
      startDate: moment().subtract(moment.duration(30, 'd')).format('L'),
      endDate: moment().format('L'),
    },
    {
      label: '90d',
      type: 'daily',
      selected: false,
      startDate: moment().subtract(moment.duration(90, 'd')).format('L'),
      endDate: moment().format('L'),
    },
    {
      label: '1y',
      type: 'daily',
      selected: false,
      startDate: moment().subtract(moment.duration(365, 'd')).format('L'),
      endDate: moment().format('L'),
    },
    {
      label: '5y',
      type: 'daily',
      selected: true,
      startDate: moment().subtract(moment.duration(1825, 'd')).format('L'),
      endDate: moment().format('L'),
    },
    {
      label: 'YTD',
      type: 'daily',
      selected: false,
      startDate: `01/01/${moment().year()}`,
      endDate: moment().format('L'),
    },
  ];

  dailyData: LineData[] = []; // reformatted for lightwieght charts
  filterDailyData: CoinPriceHistory[] = [];

  hourlyData: LineData[] = []; // reformatted for lightwieght charts
  filterHourlyData: CoinPriceHistory[] = [];

  minuteData: LineData[] = []; // reformatted for lightwieght charts
  filterMinuteData: CoinPriceHistory[] = [];

  chart: IChartApi;
  areaSeries: ISeriesApi<'Area'>;
  lineSeries: ISeriesApi<'Line'>;

  constructor(
    private cryptoDataService: CryptoDataServiceService,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    console.log(this.chipList);
    this.selectedChip = this.chipList[6]; // set 5y selected
    this.hoverPrice = Number(this.coin.RAW.USD.PRICE | 0);

    document.getElementById('hoverprice').innerHTML = formatCurrency(this.hoverPrice, 'en', '$'); // I don't like this but binding was having issues :: alternative
  }
  ngAfterViewInit(): void {
    this.cryptoDataService.coinDailyPriceObs.subscribe((data) => {
      this.priceData = data;

      this.dailyData = [];
      this.filterDailyData = [];

      if (this.priceData.Data) {
        this.formateDateTime(data, 'daily');
        console.log(this.filterDailyData);
        setTimeout(() => {
          this.createChart();
        }, 1000);
      }
      // console.log(time);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.params = {
      coin: this.coin.CoinInfo.FullName,
      symbol: this.coin.CoinInfo.Name,
      limit: 100,
      fiat: 'USD',
    };

    this.cryptoDataService.getCryptoDailyPrice(this.params);
    this.cryptoDataService.getCryptoHourlyPrice(this.params);
    this.cryptoDataService.getCryptoMinutePrice(this.params);

    this.cryptoDataService.coinHourlyPriceObs.subscribe((data) => {
      this.hourlyPriceData = data;

      this.hourlyData = [];
      this.filterHourlyData = [];

      if (this.hourlyPriceData.Data) {
        this.formateDateTime(data, 'hourly');
        console.log(this.filterHourlyData);
      }
    });
    this.cryptoDataService.coinMinutePriceObs.subscribe((data) => {
      this.hourlyPriceData = data;

      this.minuteData = [];
      this.filterMinuteData = [];

      if (this.hourlyPriceData.Data) {
        this.formateDateTime(data, 'minute');
        console.log(this.filterMinuteData);
      }
    });
    this.dateHover.subscribe((data) => {
      console.log(data);
    });
  }

  formateDateTime(data: PriceDataContainer, type: string) {
    if (type === 'daily') {
      data.Data.forEach((element) => {
        this.filterDailyData.push({
          time: moment(element.time * 1000).format('L'),
          value: Number(element.close),
        });
        this.dailyData.push({ time: moment(element.time * 1000).format('L'), value: Number(element.close) });
      });
    } else if (type === 'hourly') {
      data.Data.forEach((element) => {
        this.filterHourlyData.push({
          time: moment(element.time * 1000).format('L'), // change to unix time?
          value: Number(element.close),
        });
        this.hourlyData.push({ time: element.time, value: Number(element.close) });
      });
    } else if (type === 'minute') {
      data.Data.forEach((element) => {
        this.filterHourlyData.push({
          time: moment(element.time * 1000).format('L'), // change to unix time?
          value: Number(element.close),
        });
        this.minuteData.push({ time: element.time, value: Number(element.close) });
      });
    }
  }

  createChart() {
    console.log(this.cryptochart);

    this.getDimensions();
    document.getElementById('cryptochart').innerHTML = '';

    this.chart = createChart('cryptochart', {
      width: this.width,
      height: 450,
      localization: {
        priceFormatter: (price: string) => '$' + price,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        horzLines: {
          color: '#eee',
          visible: false,
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: 'rgba(32, 38, 46, 0.1)',
          labelVisible: false,
        },
      },
    });
    setTimeout(() => {
      this.areaSeries = this.chart.addAreaSeries({
        topColor: 'rgba(0, 150, 136, 0.56)',
        bottomColor: 'rgba(0, 150, 136, 0.04)',
        lineColor: 'rgba(0, 150, 136, 1)',
        lineWidth: 3,
      });
      this.areaSeries.setData(this.dailyData);

      this.chart.timeScale().fitContent();

      this.chart.subscribeCrosshairMove((params) => this.findDateMatch(params));
      this.show = true;
    }, 500);
  }

  // find date matches b/w crosshair and crypto data
  findDateMatch(params: MouseEventParams) {
    this.ref.detectChanges();

    let date = params.time;
    let match: CoinPriceHistory = null;
    if (date) {
      //@ts-ignore
      let prettyDate = moment(`${date.month}-${date.day}-${date.year}`).format('L');
      console.log(prettyDate);
      match = this.filterDailyData.find((x) => x.time === prettyDate);
      this.hoverPrice = match.value;
      //@ts-ignore
      document.getElementById('hoverprice').innerHTML = formatCurrency(this.hoverPrice, 'en', '$'); // variable wasn't binding so this is an alternative
    } else {
      this.hoverPrice = Number(this.coin.RAW.USD.PRICE | 0);
      document.getElementById('hoverprice').innerHTML = formatCurrency(this.hoverPrice, 'en', '$'); // variable wasn't binding so this is an alternative
    }
  }

  getDimensions() {
    console.log(this.cryptochart.nativeElement.clientWidth);
    this.width = this.cryptochart.nativeElement.clientWidth;
  }

  resize() {
    this.width = this.cryptochart.nativeElement.clientWidth;
    this.chart.resize(this.width, 450);
  }

  setActiveChip(chip: Chip) {
    console.log(chip);
    if (chip.type != this.selectedChip.type) {
      if (chip.type === 'daily') {
        this.areaSeries.setData(this.dailyData);
      } else if (chip.type === 'hourly') {
        this.areaSeries.setData(this.hourlyData);
        console.log(this.hourlyData);
      } else if (chip.type === 'minute') {
        this.areaSeries.setData(this.minuteData);
      } else {
        this.areaSeries.setData(this.dailyData);
      }
    }
    this.selectedChip = chip;

    this.chart?.timeScale()?.setVisibleRange({
      from: chip.startDate,
      to: chip.endDate,
    });
    // this.console.log(time);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.chart.unsubscribeCrosshairMove((params) => this.findDateMatch(params));
    document.getElementById('cryptochart').innerHTML = '';
    this.chart.remove();
  }
}
