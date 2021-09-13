import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesConceptComponent } from './proces-concept.component';

describe('ProcesConceptComponent', () => {
  let component: ProcesConceptComponent;
  let fixture: ComponentFixture<ProcesConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
