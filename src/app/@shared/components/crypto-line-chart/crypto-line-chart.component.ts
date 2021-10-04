import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import * as moment from 'moment';
import { CoinCG } from 'src/models/coins.model';
import { CgCoinDataService } from '@app/services/cg-coin-data.service';
import { ChartData } from '../bottom-sheet-custom/bottom-sheet-custom.component';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: ApexGrid;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};
@Component({
  selector: 'app-crypto-line-chart',
  templateUrl: './crypto-line-chart.component.html',
  styleUrls: ['./crypto-line-chart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            timing: 0.2,
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeOut, {
          params: {
            timing: 0.2,
          },
        }),
      ]),
    ]),
  ],
})
export class CryptoLineChartComponent implements OnChanges {
  @Input() chartData: ChartData[];
  @Input() coinID: string;
  @Input() theme: string;
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public rawChartData: any[] = [];
  public chartOptions: Partial<ChartOptions>;
  public chartColor = '#00E396';
  public chartFontColor = '#000';
  public chartBorder = '#d9d9d9';
  public data: any = [
    [1327359600000, 30.95],
    [1327446000000, 31.34],
    [1327532400000, 31.18],
  ];

  public activeOptionButton = 'all';
  show = false;
  constructor(private coinCGService: CgCoinDataService) {
    // this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('DEFAULT DATA');
    console.log(this.data);
    console.log('DEFAULT DATA');
    if (!!this.theme) {
      if (this.chartData.length > 0) {
        this.show = false;
        this.constructData()
          .then(() => {
            if (this.chartData[0].close > this.chartData[this.chartData.length - 1].close) {
              this.chartColor = '#ff2b2b'; // red
            } else {
              this.chartColor = '#00E396'; // green
              // this.initChartPositive();
            }
            // console.log('DEFAULT DATA');
            // console.log(JSON.stringify(this.rawChartData));
            // console.log(JSON.stringify(this.chartData));
            // console.log('DEFAULT DATA');
          })
          .then(() => {
            if (this.theme === 'light') {
              this.chartFontColor = '#000';
              this.chartBorder = '#d9d9d9';
            } else {
              this.chartFontColor = '#848484';
              this.chartBorder = '#e4e4e414';
            }
            this.initChartPositive();
          })
          .then(() => {
            setTimeout(() => {
              this.show = true;
            }, 220);
          });
      }
    }
  }

  // formats data to go into chart
  constructData() {
    this.rawChartData = [];
    let promise = new Promise((resolve, reject) => {
      this.chartData.forEach((data) => {
        this.rawChartData.push([data.time, data.close]);
      });
      if (this.rawChartData.length === this.chartData.length) {
        resolve('success');
      } else {
        reject('failed');
      }
    });
    return promise;
  }

  initChartPositive(): void {
    this.chartOptions = {
      series: [
        {
          data: this.rawChartData,
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: [this.chartColor],
      annotations: {
        yaxis: [
          // {
          //   y: 30,
          //   borderColor: '#999',
          //   label: {
          //     text: 'Support',
          //     style: {
          //       color: '#fff',
          //       background: '#00E396',
          //     },
          //   },
          // },
        ],
        xaxis: [
          // {
          //   x: new Date('14 Nov 2012').getTime(),
          //   borderColor: '#999',
          //   label: {
          //     text: 'Rally',
          //     style: {
          //       color: '#fff',
          //       background: '#775DD0',
          //     },
          //   },
          // },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: this.chartFontColor,
          },
        },
        axisBorder: {
          show: false,
        },
        // min: new Date('01 Mar 2012').getTime(),
        tickAmount: 300,
      },
      yaxis: {
        decimalsInFloat: 2,
        opposite: true,
        labels: {
          style: {
            colors: this.chartFontColor,
          },
          formatter: function (val, index) {
            if (isNaN(val)) return null; // will only work value is a number
            if (val === null) return null;
            if (val === 0) return null;
            let abs = Math.abs(val);
            const rounder = Math.pow(10, 1);
            const isNegative = val < 0; // will also work for Negetive numbers
            let key = '';

            const powers = [
              { key: 'Q', value: Math.pow(10, 15) },
              { key: 'T', value: Math.pow(10, 12) },
              { key: 'B', value: Math.pow(10, 9) },
              { key: 'M', value: Math.pow(10, 6) },
              { key: 'K', value: 1000 },
            ];

            if (val > 999) {
              for (let i = 0; i < powers.length; i++) {
                let reduced = abs / powers[i].value;
                reduced = Math.round(reduced * rounder) / rounder;
                if (reduced >= 1) {
                  abs = reduced;
                  key = powers[i].key;
                  break;
                }
              }
              return '$' + (isNegative ? '-' : '') + abs + key;
            } else {
              return '$' + (isNegative ? '-' : '') + abs.toFixed(2) + key;
            }
          },
        },
      },
      grid: {
        show: true,
        borderColor: this.chartBorder,
        strokeDashArray: 0,
        position: 'back',
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    };
  }

  // public updateOptions(option: any): void {
  //   this.activeOptionButton = option;
  //   this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  // }

  public reset() {
    this.chart.resetSeries();
  }
}
