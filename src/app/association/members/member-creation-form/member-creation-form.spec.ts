import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberCreationForm } from './member-creation-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MemberCreationForm', () => {
  let fixture: ComponentFixture<MemberCreationForm>;
  let component: MemberCreationForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberCreationForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(MemberCreationForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('starts active and renewing with no birth date or fee type', () => {
    expect(component.form.controls.birthDate.value).toBeNull();
    expect(component.form.controls.active.value).toBe(true);
    expect(component.form.controls.renew.value).toBe(true);
    expect(component.form.controls.feeType.hasError('required')).toBe(true);
    expect(fixture.nativeElement.querySelector('p-selectbutton')).toBeNull();
    expect(component.form.contains('key')).toBe(false);
    expect(fixture.nativeElement.querySelector('#keyInput')).toBeNull();
  });

  it('requires a name and fee type', () => {
    component.form.patchValue({ feeType: 3 });
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.invalid).toBe(true);

    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();

    expect(component.form.valid).toBe(true);

    component.form.patchValue({ feeType: null });
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.invalid).toBe(true);
  });

  it('emits the complete creation request with scalar lookup numbers', () => {
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);

    component.form.patchValue({
      feeType: 3,
      name: { firstName: 'Ana', nickname: '', lastName: 'López' },
      address: 'Calle Mayor'
    });
    component.form.get('feeType')?.markAsDirty();
    component.form.get('name')?.markAsDirty();
    component.form.get('address')?.markAsDirty();
    component.addContactChannel();
    component.contactChannels.at(0).patchValue({ method: 4, detail: 'ana@example.org' });
    component.onSave();

    expect(saved).toHaveBeenCalledTimes(
      1);

      expect(saved).toHaveBeenCalledWith(expect.objectContaining({
        feeType: 3,
        name: { firstName: 'Ana', nickname: '', lastName: 'López' },
        address: 'Calle Mayor',
        birthDate: undefined,
        active: true,
        renew: true,
        contactChannels: [{ method: 4, detail: 'ana@example.org' }]
      })
    );
    expect(Object.hasOwn(vi.mocked(saved).mock.lastCall![0], 'key')).toBe(false);
  });

  it('does not submit an incomplete contact channel', () => {
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);

    component.form.patchValue({ feeType: 3, name: { firstName: 'Ana' } });
    component.form.get('feeType')?.markAsDirty();
    component.form.get('name')?.markAsDirty();
    component.addContactChannel();
    component.onSave();

    expect(component.form.invalid).toBe(true);
    expect(saved).not.toHaveBeenCalled();
  });
});

describe('MemberCreationForm form submission', () => {
  const scenario = { values: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'feeType', expected: expect.objectContaining({ feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, active: true, renew: true, contactChannels: [] }) };

  let fixture: ComponentFixture<MemberCreationForm>;
  let component: MemberCreationForm;
  let emitted: Mock;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberCreationForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(MemberCreationForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

    form.markAsPristine();
    emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    fixture.detectChanges();
    expect(form.valid,'explicit fixture must be valid').toBe(true);
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBe(false);
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBe(true);
    expect(form.disabled).toBe(true);
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBe(true);
    expect(form.dirty).toBe(true);
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBe(true);
    submit();
    expect(form.get(scenario.invalid)!.touched).toBe(true);
    expect(emitted).not.toHaveBeenCalled();
  });

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
