import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { Member } from '@ucronia/domain';
import { MemberEditionForm } from './member-edition-form';

describe('MemberEditionForm', () => {
  let fixture: ComponentFixture<MemberEditionForm>;
  let component: MemberEditionForm;
  let member: Member;

  beforeEach(() => {
    member = Object.assign(new Member(), {
      number: 12,
      memberNumber: 37,
      identifier: '12345678Z',
      birthDate: new Date(1990, 2, 14),
      active: false,
      renew: false,
      address: 'Calle Mayor',
      comments: 'Prefiere correo',
      feeType: { number: 3, name: 'General', amount: 25 },
      key: 7,
      name: { firstName: 'Ana', lastName: 'López', nickname: '', fullName: 'Ana López' },
      contactChannels: [{ method: { number: 4, name: 'Email' }, detail: 'ana@example.org' }]
    });

    fixture = createFormFixture(MemberEditionForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', member);
    fixture.detectChanges();
  });

  it('loads member values and preserves false toggles and lookup numbers', () => {
    expect(component.form.controls.active.value).toBeFalse();
    expect(component.form.controls.renew.value).toBeFalse();
    expect(component.form.controls.birthDate.value).toEqual(member.birthDate);
    expect(component.form.controls.feeType.value).toBe(3);
    expect(component.form.controls.key.value).toBe(7);
    expect(component.contactChannels.getRawValue()).toEqual([{ method: 4, detail: 'ana@example.org' }]);
    expect(component.form.pristine).toBeTrue();
  });

  it('uses an empty date control when the member has no birth date', () => {
    fixture.componentRef.setInput('data', { ...member, birthDate: null });
    fixture.detectChanges();

    expect(component.form.controls.birthDate.value).toBeNull();
  });

  it('requires the name and fee type', () => {
    editForm(component.form, { name: { firstName: '' } });

    expect(component.form.invalid).toBeTrue();

    editForm(component.form, { name: { firstName: 'Ana' }, feeType: null });

    expect(component.form.invalid).toBeTrue();

    editForm(component.form, { feeType: 3 });

    expect(component.form.valid).toBeTrue();
  });

  it('emits the complete update and clears removed optional values and channels', () => {
    const saved = spyOn(component.save, 'emit');

    editForm(component.form, {
      identifier: '',
      address: '',
      comments: '',
      key: null,
      birthDate: null
    });
    component.removeContactChannel(0);
    component.onSave();

    expect(saved).toHaveBeenCalledOnceWith({
      name: { firstName: 'Ana', lastName: 'López', nickname: '' },
      feeType: 3,
      identifier: '',
      address: '',
      comments: '',
      key: undefined,
      birthDate: undefined,
      contactChannels: [],
      active: false,
      renew: false
    });
  });
});
