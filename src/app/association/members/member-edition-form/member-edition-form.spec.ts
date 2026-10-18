import { TestBed } from '@angular/core/testing';
import { Member } from '@ucronia/domain';
import { MemberEditionForm } from './member-edition-form';

describe('MemberEditionForm', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [MemberEditionForm] }));

  it('loads all values, preserving false toggles and lookup numbers', () => {
    const component = TestBed.createComponent(MemberEditionForm).componentInstance;
    const member = Object.assign(new Member(), {
      number: 12, memberNumber: 37, birthDate: null, active: false, renew: false,
      feeType: { number: 3, name: 'General', amount: 25 }, key: 7,
      name: { firstName: 'Ana', lastName: 'Test', nickname: '', fullName: 'Ana Test' },
      contactChannels: [{ method: { number: 4, name: 'Email' }, detail: 'ana@example.org' }]
    });
    component.data = member;
    expect(component.form.controls.active.value).toBeFalse();
    expect(component.form.controls.renew.value).toBeFalse();
    expect(component.form.controls.birthDate.value).toBeNull();
    expect(component.form.controls.feeType.value).toBe(3);
    expect(component.contactChannels.getRawValue()).toEqual([{ method: 4, detail: 'ana@example.org' }]);
    expect(component.form.pristine).toBeTrue();
  });

  it('emits the full update, clearing removed optional fields and channels', () => {
    const component = TestBed.createComponent(MemberEditionForm).componentInstance;
    const saved = jasmine.createSpy();
    component.save.subscribe(saved);
    component.data = Object.assign(new Member(), {
      identifier: 'Old', address: 'Old', comments: 'Old', key: 7,
      name: { firstName: 'Ana', lastName: 'Test', nickname: '', fullName: 'Ana Test' },
      feeType: { number: 3, name: 'General', amount: 25 }, active: false, renew: false,
      contactChannels: [{ method: { number: 4, name: 'Email' }, detail: 'ana@example.org' }]
    });
    component.form.patchValue({ identifier: '', address: '', comments: '', key: null, birthDate: null });
    component.removeContactChannel(0);
    component.form.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledWith({
      name: { firstName: 'Ana', lastName: 'Test', nickname: '' }, feeType: 3,
      identifier: '', address: '', comments: '', key: undefined, birthDate: undefined,
      contactChannels: [], active: false, renew: false
    });
  });

  it('does not emit an invalid or loading form', () => {
    const component = TestBed.createComponent(MemberEditionForm).componentInstance;
    const saved = jasmine.createSpy();
    component.save.subscribe(saved);
    component.form.markAsDirty();
    component.onSave();
    expect(saved).not.toHaveBeenCalled();
    component.form.patchValue({ feeType: 3, name: { firstName: 'Ana' } });
    component.loading = true;
    component.onSave();
    expect(saved).not.toHaveBeenCalled();
  });
});
