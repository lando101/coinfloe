import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiGaugeComponent } from './multi-gauge.component';

describe('MultiGaugeComponent', () => {
  let component: MultiGaugeComponent;
  let fixture: ComponentFixture<MultiGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiGaugeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
