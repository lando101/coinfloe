/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoinInfoComponent } from './coin-info.component';

describe('CoinInfoComponent', () => {
  let component: CoinInfoComponent;
  let fixture: ComponentFixture<CoinInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoinInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
