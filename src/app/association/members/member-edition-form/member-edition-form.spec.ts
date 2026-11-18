import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Member } from '@ucronia/domain';
import { MemberEditionForm } from './member-edition-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

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

    TestBed.configureTestingModule({
      imports: [MemberEditionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(MemberEditionForm);
    fixture.detectChanges();
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
    component.form.patchValue({ name: { firstName: '' } });
    component.form.get('name')?.markAsDirty();

    expect(component.form.invalid).toBeTrue();

    component.form.patchValue({ name: { firstName: 'Ana' }, feeType: null });
    component.form.get('name')?.markAsDirty();
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.invalid).toBeTrue();

    component.form.patchValue({ feeType: 3 });
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.valid).toBeTrue();
  });

  it('clears optional profile values in the full update', () => {
    const saved = spyOn(component.save, 'emit');

    component.form.patchValue({
      identifier: '',
      address: '',
      comments: '',
      birthDate: null
    });
    component.form.get('identifier')?.markAsDirty();
    component.form.get('address')?.markAsDirty();
    component.form.get('comments')?.markAsDirty();
    component.form.get('birthDate')?.markAsDirty();
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

    const values = { key: 99, address: 'Nueva dirección' };
    component.form.patchValue(values);
    component.form.get('address')?.markAsDirty();
    component.onSave();

    expect(component.form.contains('key')).toBeFalse();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ address: 'Nueva dirección' }));
    expect(Object.hasOwn(saved.calls.mostRecent().args[0], 'key')).toBeFalse();
  });

  it('does not include legacy key data in the member update', () => {
    const saved = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('data', { ...member, key: 7 });
    fixture.detectChanges();

    component.form.patchValue({ address: 'Nueva dirección' });
    component.form.get('address')?.markAsDirty();
    component.onSave();

    expect(Object.hasOwn(saved.calls.mostRecent().args[0], 'key')).toBeFalse();
  });
});

describe('MemberEditionForm form submission', () => {
  const scenario = { values: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, active: false, renew: false }, invalid: 'feeType', expected: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, identifier: '', birthDate: undefined, address: '', comments: '', active: false, renew: false, contactChannels: [] } };

  let fixture: ComponentFixture<MemberEditionForm>;
  let component: MemberEditionForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberEditionForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(MemberEditionForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

    form.markAsPristine();
    emitted = spyOn(component.save, 'emit');
    fixture.detectChanges();
    expect(form.valid).withContext('explicit fixture must be valid').toBeTrue();
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBeFalse();
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBeTrue();
    expect(form.disabled).toBeTrue();
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBeTrue();
    expect(form.dirty).toBeTrue();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBeTrue();
    submit();
    expect(form.get(scenario.invalid)!.touched).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
