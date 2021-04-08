import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTilesComponent } from './news-tiles.component';

describe('NewsTilesComponent', () => {
  let component: NewsTilesComponent;
  let fixture: ComponentFixture<NewsTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsTilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
