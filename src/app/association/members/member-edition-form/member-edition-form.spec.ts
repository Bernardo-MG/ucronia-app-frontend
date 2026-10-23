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
    expect(component.form.contains('key')).toBeFalse();
    expect(fixture.nativeElement.querySelector('#keyInput')).toBeNull();
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

  it('clears optional profile values in the full update', () => {
    const saved = spyOn(component.save, 'emit');

    editForm(component.form, {
      identifier: '',
      address: '',
      comments: '',
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
      birthDate: undefined,
      contactChannels: [],
      active: false,
      renew: false
    });
  });
  it('does not assign a key through form values', () => {
    const saved = spyOn(component.save, 'emit');

    editForm(component.form, { key: 99, address: 'Nueva dirección' });
    component.onSave();

    expect(component.form.contains('key')).toBeFalse();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ address: 'Nueva dirección' }));
    expect(Object.hasOwn(saved.calls.mostRecent().args[0], 'key')).toBeFalse();
  });

  it('does not include legacy key data in the member update', () => {
    const saved = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('data', { ...member, key: 7 });
    fixture.detectChanges();

    editForm(component.form, { address: 'Nueva dirección' });
    component.onSave();

    expect(Object.hasOwn(saved.calls.mostRecent().args[0], 'key')).toBeFalse();
  });
});
