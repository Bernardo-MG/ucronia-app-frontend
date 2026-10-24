import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { PublicMember } from '@ucronia/domain';
import { MemberKeyAssignmentForm } from './member-key-assignment-form';

describe('MemberKeyAssignmentForm', () => {
  let fixture: ComponentFixture<MemberKeyAssignmentForm>;
  let component: MemberKeyAssignmentForm;

  beforeEach(() => {
    fixture = createFormFixture(MemberKeyAssignmentForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('members', [Object.assign(new PublicMember(), {
      number: 12,
      memberNumber: 37,
      name: { fullName: 'Ana López' }
    })]);
    fixture.detectChanges();
  });

  it('requires a member before submitting', () => {
    const save = spyOn(component.save, 'emit');

    component.onSave();

    expect(component.form.invalid).toBeTrue();
    expect(save).not.toHaveBeenCalled();
  });

  it('displays the member number but emits the profile number', () => {
    const save = spyOn(component.save, 'emit');

    editForm(component.form, { profile: 12 });
    component.onSave();

    expect(component.options).toEqual([{ number: 12, label: '#37 - Ana López' }]);
    expect(save).toHaveBeenCalledOnceWith(12);
  });

  it('does not submit a number outside the supplied member options', () => {
    const save = spyOn(component.save, 'emit');

    editForm(component.form, { profile: 99 });
    component.onSave();

    expect(save).not.toHaveBeenCalled();
  });

  it('does not submit while loading', () => {
    const save = spyOn(component.save, 'emit');
    editForm(component.form, { profile: 12 });
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    component.onSave();

    expect(save).not.toHaveBeenCalled();
  });
});
