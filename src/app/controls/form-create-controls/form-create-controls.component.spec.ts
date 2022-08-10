import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateControlsComponent } from './form-create-controls.component';

describe('FormCreateControlsComponent', () => {
  let component: FormCreateControlsComponent;
  let fixture: ComponentFixture<FormCreateControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
