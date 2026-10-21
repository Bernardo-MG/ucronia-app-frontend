import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { MemberCreationForm } from './member-creation-form';

describe('MemberCreationForm', () => {
  let fixture: ComponentFixture<MemberCreationForm>;
  let component: MemberCreationForm;

  beforeEach(() => {
    fixture = createFormFixture(MemberCreationForm);
    component = fixture.componentInstance;
  });

  it('starts active and renewing with no birth date or fee type', () => {
    expect(component.form.controls.birthDate.value).toBeNull();
    expect(component.form.controls.active.value).toBeTrue();
    expect(component.form.controls.renew.value).toBeTrue();
    expect(component.form.controls.feeType.hasError('required')).toBeTrue();
    expect(fixture.nativeElement.querySelector('p-selectbutton')).toBeNull();
  });

  it('requires a name and fee type', () => {
    editForm(component.form, { feeType: 3 });

    expect(component.form.invalid).toBeTrue();

    editForm(component.form, { name: { firstName: 'Ana' } });

    expect(component.form.valid).toBeTrue();

    editForm(component.form, { feeType: null });

    expect(component.form.invalid).toBeTrue();
  });

  it('emits the complete creation request with scalar lookup numbers', () => {
    const saved = spyOn(component.save, 'emit');

    editForm(component.form, {
      feeType: 3,
      name: { firstName: 'Ana', nickname: '', lastName: 'López' },
      key: 5,
      address: 'Calle Mayor'
    });
    component.addContactChannel();
    component.contactChannels.at(0).patchValue({ method: 4, detail: 'ana@example.org' });
    component.onSave();

    expect(saved).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        feeType: 3,
        name: { firstName: 'Ana', nickname: '', lastName: 'López' },
        key: 5,
        address: 'Calle Mayor',
        birthDate: undefined,
        active: true,
        renew: true,
        contactChannels: [{ method: 4, detail: 'ana@example.org' }]
      })
    );
  });

  it('does not submit an incomplete contact channel', () => {
    const saved = spyOn(component.save, 'emit');

    editForm(component.form, { feeType: 3, name: { firstName: 'Ana' } });
    component.addContactChannel();
    component.onSave();

    expect(component.form.invalid).toBeTrue();
    expect(saved).not.toHaveBeenCalled();
  });
});
