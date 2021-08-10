import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCoinItemComponent } from './favorite-coin-item.component';

describe('FavoriteCoinItemComponent', () => {
  let component: FavoriteCoinItemComponent;
  let fixture: ComponentFixture<FavoriteCoinItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteCoinItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCoinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
