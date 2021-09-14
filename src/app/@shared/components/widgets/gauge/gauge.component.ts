import { Component, Input, OnInit } from '@angular/core';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  @Input() type: NgxGaugeType = 'full';
  @Input() value = 50;
  @Input() label = 'Unit';
  @Input() appendText = '%';
  @Input() size = 100;

  gaugeType: NgxGaugeType = 'semi';
  gaugeValue = 28.3;
  gaugeLabel = 'Speed';
  gaugeAppendText = 'km/hr';
  constructor() {}

  ngOnInit(): void {}
}
