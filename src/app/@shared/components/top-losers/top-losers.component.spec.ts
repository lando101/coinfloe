import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLosersComponent } from './top-losers.component';

describe('TopLosersComponent', () => {
  let component: TopLosersComponent;
  let fixture: ComponentFixture<TopLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopLosersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
