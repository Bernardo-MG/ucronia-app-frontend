import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FailureStore } from '@bernardo-mg/request';
import { NameNumber } from '../model/name-number';
import { NameForm } from './name-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('NameForm', () => {
  let component: NameForm;
  let fixture: ComponentFixture<NameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NameForm
      ],
      providers: [
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['number']).toBeDefined();
  });

  describe('save', () => {

    it('should emit save event when form is valid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      component.form.patchValue({ name: 'Alice', number: 1 });
      component.form.markAsDirty();

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).toHaveBeenCalledWith({ name: 'Alice', number: 1 } as NameNumber);
    });

    it('should not emit save event when the form is invalid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      component.form.patchValue({ name: '', number: 0 });

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).not.toHaveBeenCalled();
    });

  });

  it('should display validation messages for failures', () => {
    fixture.componentRef.setInput('failures', new FailureStore({
      'name': [{ message: 'Name is required' }]
    }));

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('p-message'));
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].nativeElement.textContent).toContain('Name is required');
  });
});

describe('NameForm form submission', () => {
  const scenario = { values: { number: 2, name: 'Le Guin' }, invalid: 'name', expected: { number: 2, name: 'Le Guin' } };

  let fixture: ComponentFixture<NameForm>;
  let component: NameForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NameForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(NameForm);
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
