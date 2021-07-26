import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenSearchComponent } from './full-screen-search.component';

describe('FullScreenSearchComponent', () => {
  let component: FullScreenSearchComponent;
  let fixture: ComponentFixture<FullScreenSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullScreenSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
