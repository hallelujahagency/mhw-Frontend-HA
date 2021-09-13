import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesFeatureComponent } from './cities-feature.component';

describe('CitiesFeatureComponent', () => {
  let component: CitiesFeatureComponent;
  let fixture: ComponentFixture<CitiesFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
