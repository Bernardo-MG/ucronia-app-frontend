import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { FeeTypeForm } from './fee-type-form';

describe('FeeTypeForm', () => {
  let fixture: ComponentFixture<FeeTypeForm>;
  let component: FeeTypeForm;

  beforeEach(() => {
    fixture = createFormFixture(FeeTypeForm);
    component = fixture.componentInstance;
  });

  it('requires both the name and amount', () => {
    editForm(component.form, { name: 'Monthly' });
    expect(component.form.invalid).toBeTrue();
    editForm(component.form, { amount: 15 });
    expect(component.form.valid).toBeTrue();
  });

  it('preserves a numeric amount when saving', () => {
    const saved = spyOn(component.save, 'emit');
    editForm(component.form, { name: 'Monthly', amount: 15.5 });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ name: 'Monthly', amount: 15.5 }));
  });
});
