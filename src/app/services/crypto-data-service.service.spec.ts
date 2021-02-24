/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CryptoDataServiceService } from './crypto-data-service.service';

describe('Service: CryptoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoDataServiceService],
    });
  });

  it('should ...', inject([CryptoDataServiceService], (service: CryptoDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
