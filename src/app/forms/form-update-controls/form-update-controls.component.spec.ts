import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateControlsComponent } from './form-update-controls.component';

describe('FormUpdateControlsComponent', () => {
  let component: FormUpdateControlsComponent;
  let fixture: ComponentFixture<FormUpdateControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
