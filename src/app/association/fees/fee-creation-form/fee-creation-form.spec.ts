import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { FeeCreationForm } from './fee-creation-form';
import { Profile } from '@ucronia/domain';

describe('FeeCreationForm', () => {
  let fixture: ComponentFixture<FeeCreationForm>;
  let component: FeeCreationForm;

  beforeEach(() => {
    fixture = createFormFixture(FeeCreationForm);
    component = fixture.componentInstance;
  });

  it('stores the selected member number in the fee payload', () => {
    const saved = spyOn(component.save, 'emit');
    const month = new Date(2026, 0, 1);
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    editForm(component.form, { month });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ member: 7, month });
  });
});
