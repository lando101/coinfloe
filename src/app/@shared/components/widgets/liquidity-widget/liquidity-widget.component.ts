import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { fadeInUp, fadeOutDown } from 'ng-animate';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  colors: any;
};
@Component({
  selector: 'app-liquidity-widget',
  templateUrl: './liquidity-widget.component.html',
  styleUrls: ['./liquidity-widget.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        useAnimation(fadeInUp, {
          params: {
            timing: 0.15,
            a: '20px',
            b: '0px',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeOutDown, {
          params: {
            timing: 0.15,
            a: '0px',
            b: '60px',
          },
        }),
      ]),
    ]),
  ],
})
export class LiquidityWidgetComponent implements OnChanges {
  @Input() theme: string;
  @Input() liquidity: number;
  @ViewChild('chart') chart: ChartComponent;
  show: boolean;
  public chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (!!this.liquidity)
      setTimeout(() => {
        this.show = true;
      }, 600);
    this.chartOptions = {
      series: [this.liquidity],
      colors: ['#24ccff'],
      chart: {
        height: 200,
        type: 'radialBar',
        offsetY: -15,
      },
      plotOptions: {
        radialBar: {
          startAngle: -120,
          endAngle: 120,
          dataLabels: {
            show: false,
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: -6,
              fontSize: '22px',
              color: undefined,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          gradientToColors: ['#20E647'],
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 3,
        lineCap: 'butt',
      },
      labels: ['Median Ratio'],
    };
  }

  ngOnInit(): void {}
}
