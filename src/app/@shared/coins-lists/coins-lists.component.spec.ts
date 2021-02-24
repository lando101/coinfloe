import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsListsComponent } from './coins-lists.component';

describe('CoinsListsComponent', () => {
  let component: CoinsListsComponent;
  let fixture: ComponentFixture<CoinsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinsListsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
