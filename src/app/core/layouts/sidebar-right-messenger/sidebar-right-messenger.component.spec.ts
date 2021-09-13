import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightMessengerComponent } from './sidebar-right-messenger.component';

describe('SidebarRightMessengerComponent', () => {
  let component: SidebarRightMessengerComponent;
  let fixture: ComponentFixture<SidebarRightMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRightMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
