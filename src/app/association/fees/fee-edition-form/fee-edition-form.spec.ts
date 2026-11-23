import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeEditionForm } from './fee-edition-form';
import { Fee } from '@ucronia/domain';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('FeeEditionForm', () => {
  let fixture: ComponentFixture<FeeEditionForm>;
  let component: FeeEditionForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeEditionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(FeeEditionForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('loads an unpaid fee without inventing a payment date', () => {
    fixture.componentRef.setInput('data', new Fee());
    fixture.detectChanges();
    expect(component.form.get('transaction.date')?.value).toBeNull();
    expect(component.form.invalid).toBe(true);
    expect(component.form.pristine).toBe(true);
  });

  it('submits the edited payment date in the transaction object', () => {
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    const date = new Date(2026, 0, 15);
    component.form.patchValue({ transaction: { date } });
    component.form.get('transaction')?.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledTimes(1);
    expect(saved).toHaveBeenCalledWith({ transaction: { date } });
  });
});

describe('FeeEditionForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { transaction: { date } }, invalid: 'transaction.date', expected: { transaction: { date } } };

  let fixture: ComponentFixture<FeeEditionForm>;
  let component: FeeEditionForm;
  let emitted: Mock;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeEditionForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(FeeEditionForm);
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
