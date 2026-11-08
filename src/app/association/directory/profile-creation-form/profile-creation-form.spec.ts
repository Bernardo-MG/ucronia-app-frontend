import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCreationForm } from './profile-creation-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ProfileCreationForm', () => {
  let fixture: ComponentFixture<ProfileCreationForm>;
  let component: ProfileCreationForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileCreationForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(ProfileCreationForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('accepts a first name without optional surname or nickname', () => {
    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();
    expect(component.form.valid).toBeTrue();
  });

  it('keeps all three name parts in the nested public payload', () => {
    const saved = spyOn(component.save, 'emit');
    component.form.patchValue({ name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } });
    component.form.get('name')?.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } });
  });
});

describe('ProfileCreationForm form submission', () => {
  const scenario = { values: { name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } }, invalid: 'name.firstName', expected: jasmine.objectContaining({ name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } }) };

  let fixture: ComponentFixture<ProfileCreationForm>;
  let component: ProfileCreationForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileCreationForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(ProfileCreationForm);
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
