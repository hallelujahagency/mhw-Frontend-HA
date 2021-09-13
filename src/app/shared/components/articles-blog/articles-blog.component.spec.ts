import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBlogComponent } from './articles-blog.component';

describe('ArticlesBlogComponent', () => {
  let component: ArticlesBlogComponent;
  let fixture: ComponentFixture<ArticlesBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
