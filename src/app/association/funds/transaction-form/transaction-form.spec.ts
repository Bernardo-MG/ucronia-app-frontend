import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionForm } from './transaction-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('TransactionForm', () => {
  let fixture: ComponentFixture<TransactionForm>;
  let component: TransactionForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(TransactionForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  for (const [type, amount] of [['income', 25], ['expense', -25]] as const) {
    it(`serializes ${type} with the correct amount sign`, () => {
      const saved = spyOn(component.save, 'emit');
      const date = new Date(2026, 0, 15);
      component.form.patchValue({ type, amount: 25, description: 'Club payment', date });
      component.form.get('type')?.markAsDirty();
      component.form.get('amount')?.markAsDirty();
      component.form.get('description')?.markAsDirty();
      component.form.get('date')?.markAsDirty();
      component.onSave();
      expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ amount, description: 'Club payment', date }));
    });
  }

  it('rejects nonpositive transaction amounts', () => {
    component.form.patchValue({ amount: 0 });
    component.form.get('amount')?.markAsDirty();
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
