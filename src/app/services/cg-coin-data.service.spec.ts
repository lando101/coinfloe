import { TestBed } from '@angular/core/testing';

import { CgCoinDataService } from './cg-coin-data.service';

describe('CgCoinDataService', () => {
  let service: CgCoinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CgCoinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
