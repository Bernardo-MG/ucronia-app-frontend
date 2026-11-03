import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { TransactionForm } from './transaction-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('TransactionForm', () => {
  let fixture: ComponentFixture<TransactionForm>;
  let component: TransactionForm;

  beforeEach(() => {
    fixture = createFormFixture(TransactionForm);
    component = fixture.componentInstance;
  });

  for (const [type, amount] of [['income', 25], ['expense', -25]] as const) {
    it(`serializes ${type} with the correct amount sign`, () => {
      const saved = spyOn(component.save, 'emit');
      const date = new Date(2026, 0, 15);
      editForm(component.form, { type, amount: 25, description: 'Club payment', date });
      component.onSave();
      expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ amount, description: 'Club payment', date }));
    });
  }

  it('rejects nonpositive transaction amounts', () => {
    editForm(component.form, { amount: 0 });
    expect(component.form.get('amount')?.hasError('min')).toBeTrue();
  });
});

describe('TransactionForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { description: 'Donation', date, amount: 25 }, invalid: 'amount', expected: jasmine.objectContaining({ description: 'Donation', date, amount: 25 }) };

  let fixture: ComponentFixture<TransactionForm>;
  let component: TransactionForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(TransactionForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('showActions', false);
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

  it('hides inline actions when the drawer owns them', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });

  it('cancels inline editing without submitting', () => {
    const cancelled = spyOn(component.cancelEdition, 'emit');
    fixture.componentRef.setInput('showActions', true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[data-action="cancel"]').click();
    expect(cancelled).toHaveBeenCalledTimes(1);
    expect(emitted).not.toHaveBeenCalled();
  });
});
