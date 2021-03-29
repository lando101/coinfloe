import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CryptoDataServiceService, CryptoQuery } from '@app/services/crypto-data-service.service';
import { createChart, IChartApi, ISeriesApi, LineData } from 'lightweight-charts';
import { CoinPriceHistory, PriceDataContainer } from 'src/models/coin-price-history.model';
import { Coin } from 'src/models/coins.model';
import * as moment from 'moment';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss'],
})
export class CryptoChartComponent implements OnInit {
  @ViewChild('cryptochart', { read: ElementRef }) cryptochart: ElementRef;
  @Input() coin: Coin;

  width: 0;
  height: 450;

  params: CryptoQuery = {};

  priceData: PriceDataContainer = {};

  dailyData: LineData[] = []; // reformatted for lightwieght charts

  chart: IChartApi;
  lineSeries: ISeriesApi<'Line'>;

  constructor(private cryptoDataService: CryptoDataServiceService) {}

  ngOnInit(): void {
    this.cryptoDataService.coinDailyPriceObs.subscribe((data) => {
      this.priceData = data;
      this.dailyData = [];
      let time = moment(this.priceData.TimeFrom * 1000).format('L');
      if (this.priceData.Data) {
        this.priceData.Data.forEach((element) => {
          this.dailyData.push({ time: moment(element.time * 1000).format('L'), value: Number(element.close) });
        });
        this.createChart();
      }

      console.log(this.dailyData);
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
    });
    setTimeout(() => {
      this.lineSeries = this.chart.addLineSeries();
      this.lineSeries.setData(this.dailyData);
    }, 1000);
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
