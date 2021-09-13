import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDestinationComponent } from './card-destination.component';

describe('CardDestinationComponent', () => {
  let component: CardDestinationComponent;
  let fixture: ComponentFixture<CardDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
