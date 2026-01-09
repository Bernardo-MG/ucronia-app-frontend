import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeForm } from './fee-type-form';

describe('FeeTypeForm', () => {
  let component: FeeTypeForm;
  let fixture: ComponentFixture<FeeTypeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeTypeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTypeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
