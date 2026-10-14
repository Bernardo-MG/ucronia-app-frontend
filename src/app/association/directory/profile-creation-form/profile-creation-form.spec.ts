import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { ProfileCreationForm } from './profile-creation-form';

describe('ProfileCreationForm', () => {
  let fixture: ComponentFixture<ProfileCreationForm>;
  let component: ProfileCreationForm;

  beforeEach(() => {
    fixture = createFormFixture(ProfileCreationForm);
    component = fixture.componentInstance;
  });

  it('accepts a first name without optional surname or nickname', () => {
    editForm(component.form, { name: { firstName: 'Ana' } });
    expect(component.form.valid).toBeTrue();
  });

  it('keeps all three name parts in the nested public payload', () => {
    const saved = spyOn(component.save, 'emit');
    editForm(component.form, { name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } });
  });
});
