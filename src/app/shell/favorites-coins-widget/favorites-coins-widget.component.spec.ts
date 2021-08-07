import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCoinsWidgetComponent } from './favorites-coins-widget.component';

describe('FavoritesCoinsWidgetComponent', () => {
  let component: FavoritesCoinsWidgetComponent;
  let fixture: ComponentFixture<FavoritesCoinsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesCoinsWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesCoinsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
