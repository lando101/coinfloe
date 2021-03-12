import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinItemLoaderComponent } from './coin-item-loader.component';

describe('CoinItemLoaderComponent', () => {
  let component: CoinItemLoaderComponent;
  let fixture: ComponentFixture<CoinItemLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinItemLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinItemLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
