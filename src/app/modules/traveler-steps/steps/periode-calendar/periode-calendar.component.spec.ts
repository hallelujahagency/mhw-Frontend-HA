import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeCalendarComponent } from './periode-calendar.component';

describe('PeriodeCalendarComponent', () => {
  let component: PeriodeCalendarComponent;
  let fixture: ComponentFixture<PeriodeCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
