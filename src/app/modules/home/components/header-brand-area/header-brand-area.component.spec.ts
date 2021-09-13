import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBrandAreaComponent } from './header-brand-area.component';

describe('HeaderBrandAreaComponent', () => {
  let component: HeaderBrandAreaComponent;
  let fixture: ComponentFixture<HeaderBrandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBrandAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBrandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
