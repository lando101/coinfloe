import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoLineChartComponent } from './crypto-line-chart.component';

describe('CryptoLineChartComponent', () => {
  let component: CryptoLineChartComponent;
  let fixture: ComponentFixture<CryptoLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
