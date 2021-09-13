import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepTailwindCssComponent } from './wizard-step-tailwind-css.component';

describe('WizardStepTailwindCssComponent', () => {
  let component: WizardStepTailwindCssComponent;
  let fixture: ComponentFixture<WizardStepTailwindCssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardStepTailwindCssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardStepTailwindCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
