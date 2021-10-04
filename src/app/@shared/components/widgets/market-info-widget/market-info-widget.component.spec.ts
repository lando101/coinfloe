import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInfoWidgetComponent } from './market-info-widget.component';

describe('MarketInfoWidgetComponent', () => {
  let component: MarketInfoWidgetComponent;
  let fixture: ComponentFixture<MarketInfoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketInfoWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketInfoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
