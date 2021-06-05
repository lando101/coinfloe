import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoaderTallComponent } from './news-loader-tall.component';

describe('NewsLoaderTallComponent', () => {
  let component: NewsLoaderTallComponent;
  let fixture: ComponentFixture<NewsLoaderTallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsLoaderTallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoaderTallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
