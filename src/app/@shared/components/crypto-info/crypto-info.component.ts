import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fadeInUp, fadeOutDown } from 'ng-animate';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CoinInfo, CoinInfoExpanded } from 'src/models/coin-info.model';
import { Coin, CoinCG } from 'src/models/coins.model';

@Component({
  selector: 'app-crypto-info',
  templateUrl: './crypto-info.component.html',
  styleUrls: ['./crypto-info.component.scss'],
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
export class CryptoInfoComponent implements OnChanges {
  @Input() theme: string;
  @Input() coin: CoinCG;
  @Input() coinInfo: CoinInfo;
  showDesc: boolean;

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
  };

  expanded = false;
  markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.coinInfo);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (!!this.coinInfo) {
      setTimeout(() => {
        this.showDesc = true;
      }, 200);
    }
  }
}
