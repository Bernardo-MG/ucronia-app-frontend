import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTokenExtendForm } from './user-token-extend-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('UserTokenExtendForm', () => {
  let fixture: ComponentFixture<UserTokenExtendForm>;
  let component: UserTokenExtendForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserTokenExtendForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(UserTokenExtendForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('loads the existing expiration date as unchanged data', () => {
    const date = new Date(2026, 0, 15);
    fixture.componentRef.setInput('expirationDate', date);
    fixture.detectChanges();
    expect(component.form.get('expirationDate')?.value).toEqual(date);
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
  });
});

describe('UserTokenExtendForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { expirationDate: date }, invalid: 'expirationDate', expected: date };

  let fixture: ComponentFixture<UserTokenExtendForm>;
  let component: UserTokenExtendForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserTokenExtendForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(UserTokenExtendForm);
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
