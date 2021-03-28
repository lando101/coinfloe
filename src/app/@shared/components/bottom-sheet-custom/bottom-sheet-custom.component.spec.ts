import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCustomComponent } from './bottom-sheet-custom.component';

describe('BottomSheetCustomComponent', () => {
  let component: BottomSheetCustomComponent;
  let fixture: ComponentFixture<BottomSheetCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSheetCustomComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
