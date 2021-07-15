import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLowProgressComponent } from './high-low-progress.component';

describe('HighLowProgressComponent', () => {
  let component: HighLowProgressComponent;
  let fixture: ComponentFixture<HighLowProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighLowProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighLowProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
