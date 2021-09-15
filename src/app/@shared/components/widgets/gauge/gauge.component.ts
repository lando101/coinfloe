import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
} from 'ng-apexcharts';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEthereum, faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faDotCircle, faLaptopCode, faSmileBeam, faSadTear, IconName } from '@fortawesome/free-solid-svg-icons';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  fill: ApexFill;
};
@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
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

  constructor(private library: FaIconLibrary) {
    library.addIcons(faEthereum, faBitcoin, faDotCircle, faLaptopCode, faSmileBeam, faSadTear);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes?.currentValue?.currentValue;
    const theme = changes?.theme?.currentValue;
    console.log('CHANGE IN GAUGE');
    console.log(value);
    console.log('CHANGE IN GAUGE');
    if (value > 0) {
      this.chartOptions = {
        series: [value],
        chart: {
          height: 125,
          type: 'radialBar',
          animations: {
            enabled: true,
          },
        },
        fill: {
          type: 'solid',
          colors: [this.color],
        },
        plotOptions: {},
        stroke: {
          lineCap: 'round',
        },
        // labels: ['Cricket'],
      };
      this.show = true;
    }
    if (theme === 'light') {
      this.chartOptions.plotOptions = {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            show: false,
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
        },
      };
    } else if (theme === 'dark') {
      this.chartOptions.plotOptions = {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            show: false,
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#52526340',
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
        },
      };
    }
  }
}
