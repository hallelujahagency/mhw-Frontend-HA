import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerCardInfoComponent } from './traveler-card-info.component';

describe('TravelerCardInfoComponent', () => {
  let component: TravelerCardInfoComponent;
  let fixture: ComponentFixture<TravelerCardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelerCardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelerCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
