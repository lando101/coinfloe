import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoaderShortComponent } from './news-loader-short.component';

describe('NewsLoaderShortComponent', () => {
  let component: NewsLoaderShortComponent;
  let fixture: ComponentFixture<NewsLoaderShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsLoaderShortComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoaderShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
