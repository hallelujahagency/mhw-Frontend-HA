import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesBlankComponent } from './messages-blank.component';

describe('MessagesBlankComponent', () => {
  let component: MessagesBlankComponent;
  let fixture: ComponentFixture<MessagesBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
