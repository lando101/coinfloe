import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GlobalData } from 'src/models/crypto-global-data.model';
import { GlobalMetrics } from 'src/models/global-metric.model';
import { faEthereum, faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDotCircle, faLaptopCode, faSadTear, faSmileBeam } from '@fortawesome/free-solid-svg-icons';
import { TradingSignals } from 'src/models/coin-trading-signals.model';

@Component({
  selector: 'app-market-cap',
  templateUrl: './market-cap.component.html',
  styleUrls: ['./market-cap.component.scss'],
})
export class MarketCapComponent implements OnInit {
  @Input() theme: string;
  @Input() globalData: GlobalData;
  @Input() globalMetrics: GlobalMetrics;
  @Input() tradingSignals: TradingSignals;

  constructor(private library: FaIconLibrary) {
    library.addIcons(faEthereum, faBitcoin, faDotCircle, faLaptopCode, faSmileBeam, faSadTear);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.globalData);
    console.log(this.globalMetrics);
  }
}
