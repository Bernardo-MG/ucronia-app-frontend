import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberCreationForm } from './member-creation-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MemberCreationForm', () => {
  let fixture: ComponentFixture<MemberCreationForm>;
  let component: MemberCreationForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberCreationForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(MemberCreationForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('starts active and renewing with no birth date or fee type', () => {
    expect(component.form.controls.birthDate.value).toBeNull();
    expect(component.form.controls.active.value).toBeTrue();
    expect(component.form.controls.renew.value).toBeTrue();
    expect(component.form.controls.feeType.hasError('required')).toBeTrue();
    expect(fixture.nativeElement.querySelector('p-selectbutton')).toBeNull();
    expect(component.form.contains('key')).toBeFalse();
    expect(fixture.nativeElement.querySelector('#keyInput')).toBeNull();
  });

  it('requires a name and fee type', () => {
    component.form.patchValue({ feeType: 3 });
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.invalid).toBeTrue();

    component.form.patchValue({ name: { firstName: 'Ana' } });
    component.form.get('name')?.markAsDirty();

    expect(component.form.valid).toBeTrue();

    component.form.patchValue({ feeType: null });
    component.form.get('feeType')?.markAsDirty();

    expect(component.form.invalid).toBeTrue();
  });

  it('emits the complete creation request with scalar lookup numbers', () => {
    const saved = spyOn(component.save, 'emit');

    component.form.patchValue({
      feeType: 3,
      name: { firstName: 'Ana', nickname: '', lastName: 'López' },
      address: 'Calle Mayor'
    });
    component.form.get('feeType')?.markAsDirty();
    component.form.get('name')?.markAsDirty();
    component.form.get('address')?.markAsDirty();
    component.addContactChannel();
    component.contactChannels.at(0).patchValue({ method: 4, detail: 'ana@example.org' });
    component.onSave();

    expect(saved).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        feeType: 3,
        name: { firstName: 'Ana', nickname: '', lastName: 'López' },
        address: 'Calle Mayor',
        birthDate: undefined,
        active: true,
        renew: true,
        contactChannels: [{ method: 4, detail: 'ana@example.org' }]
      })
    );
    expect(Object.hasOwn(saved.calls.mostRecent().args[0], 'key')).toBeFalse();
  });

  it('does not submit an incomplete contact channel', () => {
    const saved = spyOn(component.save, 'emit');

    component.form.patchValue({ feeType: 3, name: { firstName: 'Ana' } });
    component.form.get('feeType')?.markAsDirty();
    component.form.get('name')?.markAsDirty();
    component.addContactChannel();
    component.onSave();

    expect(component.form.invalid).toBeTrue();
    expect(saved).not.toHaveBeenCalled();
  });
});

describe('MemberCreationForm form submission', () => {
  const scenario = { values: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'feeType', expected: jasmine.objectContaining({ feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, active: true, renew: true, contactChannels: [] }) };

  let fixture: ComponentFixture<MemberCreationForm>;
  let component: MemberCreationForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberCreationForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(MemberCreationForm);
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
