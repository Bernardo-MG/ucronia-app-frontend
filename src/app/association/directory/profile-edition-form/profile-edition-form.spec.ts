import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditionForm } from './profile-edition-form';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
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
    expect(component.form.get('feeType.number')?.hasError('required')).toBeTrue();
    component.onTypeChange({ value: ['guest'] } as SelectButtonChangeEvent);
    expect(component.form.get('feeType.number')?.hasError('required')).toBeFalse();
    expect(component.form.valid).toBeTrue();
  });

  it('includes the selected profile types when saving', () => {
    const saved = spyOn(component.save, 'emit');
    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();
    component.onTypeChange({ value: ['guest', 'sponsor'] } as SelectButtonChangeEvent);
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ types: ['guest', 'sponsor'] }));
  });
});

describe('ProfileEditionForm form submission', () => {
  const scenario = { values: { name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'name.firstName', expected: jasmine.objectContaining({ types: [], name: { firstName: 'Ana', nickname: '', lastName: 'López' } }) };

  let fixture: ComponentFixture<ProfileEditionForm>;
  let component: ProfileEditionForm;
  let emitted: jasmine.Spy;
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
