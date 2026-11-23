import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeTypeForm } from './fee-type-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('FeeTypeForm', () => {
  let fixture: ComponentFixture<FeeTypeForm>;
  let component: FeeTypeForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeTypeForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(FeeTypeForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('requires both the name and amount', () => {
    component.form.patchValue({ name: 'Monthly' });
    component.form.get('name')?.markAsDirty();
    expect(component.form.invalid).toBe(true);
    component.form.patchValue({ amount: 15 });
    component.form.get('amount')?.markAsDirty();
    expect(component.form.valid).toBe(true);
  });

  it('preserves a numeric amount when saving', () => {
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    component.form.patchValue({ name: 'Monthly', amount: 15.5 });
    component.form.get('name')?.markAsDirty();
    component.form.get('amount')?.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledTimes(1);
    expect(saved).toHaveBeenCalledWith(expect.objectContaining({ name: 'Monthly', amount: 15.5 }));
  });
});

describe('FeeTypeForm form submission', () => {
  const scenario = { values: { number: 2, name: 'Monthly', amount: 15 }, invalid: 'amount', expected: { number: 2, name: 'Monthly', amount: 15 } };

  let fixture: ComponentFixture<FeeTypeForm>;
  let component: FeeTypeForm;
  let emitted: Mock;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeTypeForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(FeeTypeForm);
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
