import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMetricsWidgetComponent } from './social-metrics-widget.component';

describe('SocialMetricsWidgetComponent', () => {
  let component: SocialMetricsWidgetComponent;
  let fixture: ComponentFixture<SocialMetricsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialMetricsWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMetricsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
