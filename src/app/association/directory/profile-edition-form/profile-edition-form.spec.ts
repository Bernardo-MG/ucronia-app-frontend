import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { ProfileEditionForm } from './profile-edition-form';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';

describe('ProfileEditionForm', () => {
  let fixture: ComponentFixture<ProfileEditionForm>;
  let component: ProfileEditionForm;

  beforeEach(() => {
    fixture = createFormFixture(ProfileEditionForm);
    component = fixture.componentInstance;
  });

  it('requires a fee type only when the profile is a member', () => {
    editForm(component.form, { name: { firstName: 'Ana' } });
    component.onTypeChange({ value: ['member'] } as SelectButtonChangeEvent);
    expect(component.form.get('feeType.number')?.hasError('required')).toBeTrue();
    component.onTypeChange({ value: ['guest'] } as SelectButtonChangeEvent);
    expect(component.form.get('feeType.number')?.hasError('required')).toBeFalse();
    expect(component.form.valid).toBeTrue();
  });

  it('includes the selected profile types when saving', () => {
    const saved = spyOn(component.save, 'emit');
    editForm(component.form, { name: { firstName: 'Ana' } });
    component.onTypeChange({ value: ['guest', 'sponsor'] } as SelectButtonChangeEvent);
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ types: ['guest', 'sponsor'] }));
  });
});
