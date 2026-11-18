import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePaymentsForm } from './fee-payments-form';
import { Profile } from '@ucronia/domain';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('FeePaymentsForm', () => {
  let fixture: ComponentFixture<FeePaymentsForm>;
  let component: FeePaymentsForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeePaymentsForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(FeePaymentsForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('creates a required month when selecting a member', () => {
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    expect(component.form.get('member')?.value).toBe(7);
    expect(component.months.length).toBe(1);
    expect(component.months.at(0).hasError('required')).toBeTrue();
  });

  it('removes only the selected month', () => {
    component.addDate();
    component.addDate();
    const month = new Date(2026, 0, 1);
    component.months.at(1).setValue(month);
    component.removeDate(0);
    expect(component.months.length).toBe(1);
    expect(component.months.at(0).value).toEqual(month);
  });
});

describe('FeePaymentsForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { member: 7, paymentDate: date, months: [date] }, invalid: 'member', expected: { member: 7, paymentDate: date, months: [date] } };

  let fixture: ComponentFixture<FeePaymentsForm>;
  let component: FeePaymentsForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeePaymentsForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(FeePaymentsForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('formId', 'form-contract');
    component.months.push(new FormControl(date, Validators.required));
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
