import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CoinInfo, CoinInfoExpanded } from 'src/models/coin-info.model';
import { Coin, CoinCG } from 'src/models/coins.model';

@Component({
  selector: 'app-crypto-info',
  templateUrl: './crypto-info.component.html',
  styleUrls: ['./crypto-info.component.scss'],
})
export class CryptoInfoComponent implements OnInit {
  @Input() theme: string;
  @Input() coin: CoinCG;
  @Input() coinInfo: CoinInfo;

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

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('COIN INFO CHANGES');
  //   console.log(changes);
  //   console.log('COIN INFO CHANGES');
  // }
}
