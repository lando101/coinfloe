import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthWidgetComponent } from './ath-widget.component';

describe('AthWidgetComponent', () => {
  let component: AthWidgetComponent;
  let fixture: ComponentFixture<AthWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AthWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
