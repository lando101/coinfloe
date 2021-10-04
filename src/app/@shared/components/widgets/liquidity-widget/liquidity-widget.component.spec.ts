import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityWidgetComponent } from './liquidity-widget.component';

describe('LiquidityWidgetComponent', () => {
  let component: LiquidityWidgetComponent;
  let fixture: ComponentFixture<LiquidityWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiquidityWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidityWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
