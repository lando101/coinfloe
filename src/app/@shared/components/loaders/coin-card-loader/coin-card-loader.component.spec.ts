import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCardLoaderComponent } from './coin-card-loader.component';

describe('CoinCardLoaderComponent', () => {
  let component: CoinCardLoaderComponent;
  let fixture: ComponentFixture<CoinCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinCardLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
