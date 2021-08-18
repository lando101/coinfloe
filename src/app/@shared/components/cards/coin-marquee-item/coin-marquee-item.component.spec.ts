import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinMarqueeItemComponent } from './coin-marquee-item.component';

describe('CoinMarqueeItemComponent', () => {
  let component: CoinMarqueeItemComponent;
  let fixture: ComponentFixture<CoinMarqueeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinMarqueeItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinMarqueeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
