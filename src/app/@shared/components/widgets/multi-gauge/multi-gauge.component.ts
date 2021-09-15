import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexStroke, ApexFill } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
@Component({
  selector: 'app-multi-gauge',
  templateUrl: './multi-gauge.component.html',
  styleUrls: ['./multi-gauge.component.scss'],
})
export class MultiGaugeComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @Input() title: string;
  @Input() desc: string;
  @Input() icon: any;
  @Input() iconType: string;
  @Input() theme: string;
  @Input() max: number;
  @Input() min: number;
  @Input() currentValue: number;
  @Input() color: string;

  show: boolean;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [44, 55, 67],
      chart: {
        height: 125,
        type: 'radialBar',
      },
      fill: {
        type: 'solid',
        colors: ['#03a9f4', '#414977', '#ff9400'],
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '1%',
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#e2e2e2',
            strokeWidth: '97%',
            opacity: 1,
            margin: 5,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            show: false,
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Apples', 'Oranges', 'Bananas'],
    };
  }

  ngOnInit(): void {}
}
