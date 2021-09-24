import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
})
export class LiquidityWidgetComponent implements OnChanges {
  @Input() theme: string;
  @Input() liquidity: number;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
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
