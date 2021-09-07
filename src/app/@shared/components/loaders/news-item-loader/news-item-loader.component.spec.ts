import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemLoaderComponent } from './news-item-loader.component';

describe('NewsItemLoaderComponent', () => {
  let component: NewsItemLoaderComponent;
  let fixture: ComponentFixture<NewsItemLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsItemLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
