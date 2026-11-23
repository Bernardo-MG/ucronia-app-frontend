import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditionForm } from './profile-edition-form';
import { SelectButtonChangeEvent } from '@openng/optimus-ui/selectbutton';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ProfileEditionForm', () => {
  let fixture: ComponentFixture<ProfileEditionForm>;
  let component: ProfileEditionForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileEditionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(ProfileEditionForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('requires a fee type only when the profile is a member', () => {
    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();
    component.onTypeChange({ value: ['member'] } as SelectButtonChangeEvent);
    expect(component.form.get('feeType.number')?.hasError('required')).toBe(true);
    component.onTypeChange({ value: ['guest'] } as SelectButtonChangeEvent);
    expect(component.form.get('feeType.number')?.hasError('required')).toBe(false);
    expect(component.form.valid).toBe(true);
  });

  it('includes the selected profile types when saving', () => {
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();
    component.onTypeChange({ value: ['guest', 'sponsor'] } as SelectButtonChangeEvent);
    component.onSave();
    expect(saved).toHaveBeenCalledTimes(1);
    expect(saved).toHaveBeenCalledWith(expect.objectContaining({ types: ['guest', 'sponsor'] }));
  });
});

describe('ProfileEditionForm form submission', () => {
  const scenario = { values: { name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'name.firstName', expected: expect.objectContaining({ types: [], name: { firstName: 'Ana', nickname: '', lastName: 'López' } }) };

  let fixture: ComponentFixture<ProfileEditionForm>;
  let component: ProfileEditionForm;
  let emitted: Mock;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileEditionForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(ProfileEditionForm);
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
