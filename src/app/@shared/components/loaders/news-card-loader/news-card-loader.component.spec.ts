import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardLoaderComponent } from './news-card-loader.component';

describe('NewsCardLoaderComponent', () => {
  let component: NewsCardLoaderComponent;
  let fixture: ComponentFixture<NewsCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCardLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
