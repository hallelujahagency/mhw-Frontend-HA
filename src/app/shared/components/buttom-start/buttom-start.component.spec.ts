import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomStartComponent } from './buttom-start.component';

describe('ButtomStartComponent', () => {
  let component: ButtomStartComponent;
  let fixture: ComponentFixture<ButtomStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
