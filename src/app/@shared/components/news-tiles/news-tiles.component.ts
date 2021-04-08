import { Component, OnInit } from '@angular/core';
import { CryptoDataServiceService } from '@app/services/crypto-data-service.service';

@Component({
  selector: 'app-news-tiles',
  templateUrl: './news-tiles.component.html',
  styleUrls: ['./news-tiles.component.scss'],
})
export class NewsTilesComponent implements OnInit {
  constructor(private cryptoDataService: CryptoDataServiceService) {}

  ngOnInit(): void {
    // this.cryptoDataService.getPopNews();
    this.cryptoDataService.popNewsObs.subscribe((data) => {
      if (data != '' || data != null) {
        console.log(data);
      }
    });
  }
}
