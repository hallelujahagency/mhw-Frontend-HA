import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftMessengerComponent } from './sidebar-left-messenger.component';

describe('SidebarLeftMessengerComponent', () => {
  let component: SidebarLeftMessengerComponent;
  let fixture: ComponentFixture<SidebarLeftMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarLeftMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
