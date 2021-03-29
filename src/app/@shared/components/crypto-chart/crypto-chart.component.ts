import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { createChart, IChartApi, ISeriesApi, LineData, MouseEventHandler, MouseEventParams } from 'lightweight-charts';
import { CoinPriceHistory, PriceDataContainer } from 'src/models/coin-price-history.model';
import { Coin } from 'src/models/coins.model';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss'],
})
export class CryptoChartComponent implements OnInit {
  @ViewChild('cryptochart', { read: ElementRef }) cryptochart: ElementRef;
  @Input() coin: Coin;
  dateHover: BehaviorSubject<any> = new BehaviorSubject<any>(''); // subscribe for block chain data

  width: 0;
  height: 450;
  hoverPrice: number = 0;
  params: CryptoQuery = {};

  priceData: PriceDataContainer = {};

  dailyData: LineData[] = []; // reformatted for lightwieght charts
  filterDailyData: CoinPriceHistory[] = [];

  chart: IChartApi;
  areaSeries: ISeriesApi<'Area'>;
  lineSeries: ISeriesApi<'Line'>;

  constructor(private cryptoDataService: CryptoDataServiceService) {}

  ngOnInit(): void {
    this.hoverPrice = Number(this.coin.RAW.USD.PRICE | 0);
    this.cryptoDataService.coinDailyPriceObs.subscribe((data) => {
      this.priceData = data;

      this.dailyData = [];
      this.filterDailyData = [];

      let time = moment(this.priceData.TimeFrom * 1000).format('L');
      if (this.priceData.Data) {
        this.priceData.Data.forEach((element) => {
          this.filterDailyData.push({ time: moment(element.time * 1000).format('L'), value: Number(element.close) });
          this.dailyData.push({ time: moment(element.time * 1000).format('L'), value: Number(element.close) });
        });
        console.log(this.filterDailyData);
        this.createChart();
      }
      // console.log(time);
    });
    this.dateHover.subscribe((data) => {
      console.log(data);
    });
  }
  ngAfterViewInit(): void {}

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
  }

  createChart() {
    console.log(this.cryptochart);
    this.getDimensions();
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.chart = createChart('cryptochart', {
      width: this.width,
      height: 450,
      localization: {
        priceFormatter: (price: string) =>
          // add $ sign before price

          '$' + price,
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
      // this.lineSeries = this.chart.addLineSeries();
      this.areaSeries.setData(this.dailyData);

      this.chart.timeScale().fitContent();
      // this.chart.subscribeCrosshairMove(function (param) {
      //   // console.log(param.time);
      //   this.dataHover.next('');
      //   return param.time;
      // });
      this.chart.subscribeCrosshairMove((params) => this.findDateMatch(params));
    }, 1000);
  }

  findDateMatch(params: MouseEventParams) {
    let date = params.time;
    let match = null;
    if (date) {
      //@ts-ignore
      let prettyDate = moment(`${date.month}-${date.day}-${date.year}`).format('L');
      match = this.filterDailyData.find((x) => x.time === prettyDate);
      this.hoverPrice = Number(match.value);
      console.log(prettyDate);
    } else {
      this.hoverPrice = Number(this.coin.RAW.USD.PRICE | 0);
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
}
