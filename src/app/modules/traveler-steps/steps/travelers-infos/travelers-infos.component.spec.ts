import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelersInfosComponent } from './travelers-infos.component';

describe('TravelersInfosComponent', () => {
  let component: TravelersInfosComponent;
  let fixture: ComponentFixture<TravelersInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelersInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelersInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
