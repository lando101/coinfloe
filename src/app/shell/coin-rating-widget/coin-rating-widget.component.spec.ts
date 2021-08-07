import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinRatingWidgetComponent } from './coin-rating-widget.component';

describe('CoinRatingWidgetComponent', () => {
  let component: CoinRatingWidgetComponent;
  let fixture: ComponentFixture<CoinRatingWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinRatingWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinRatingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
