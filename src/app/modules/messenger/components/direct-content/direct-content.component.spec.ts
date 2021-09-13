import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectContentComponent } from './direct-content.component';

describe('DirectContentComponent', () => {
  let component: DirectContentComponent;
  let fixture: ComponentFixture<DirectContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
