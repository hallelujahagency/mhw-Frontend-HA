import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurConceptVideoComponent } from './our-concept-video.component';

describe('OurConceptVideoComponent', () => {
  let component: OurConceptVideoComponent;
  let fixture: ComponentFixture<OurConceptVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurConceptVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurConceptVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
