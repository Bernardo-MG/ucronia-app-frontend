import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeCreationForm } from './fee-creation-form';
import { By } from '@angular/platform-browser';
import { Profile, PublicMember } from '@ucronia/domain';
import { AutoComplete } from 'primeng/autocomplete';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('FeeCreationForm', () => {
  let fixture: ComponentFixture<FeeCreationForm>;
  let component: FeeCreationForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeCreationForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(FeeCreationForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('keeps a member suggestion selectable when the search input loses focus', async () => {
    const member = Object.assign(new PublicMember(), { number: 7 });
    member.name.fullName = 'Ana García';
    fixture.componentRef.setInput('members', [member]);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('#profile-member-search') as HTMLInputElement;
    const autocomplete = fixture.debugElement.query(By.directive(AutoComplete)).componentInstance as AutoComplete;
    input.value = 'Ana';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(input.value).toBe('Ana');

    autocomplete.onOptionSelect(new MouseEvent('click'), member);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('Ana García');
    expect(component.form.get('member')?.value).toBe(7);

    input.value = 'Other';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(component.form.get('member')?.value).toBeNull();
  });

  it('stores the selected member number in the fee payload', () => {
    const saved = spyOn(component.save, 'emit');
    const month = new Date(2026, 0, 1);
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    component.form.patchValue({ month });
    component.form.get('month')?.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ member: 7, month });
  });
});

describe('FeeCreationForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { member: 7, month: date }, invalid: 'member', expected: { member: 7, month: date } };

  let fixture: ComponentFixture<FeeCreationForm>;
  let component: FeeCreationForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeCreationForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(FeeCreationForm);
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
