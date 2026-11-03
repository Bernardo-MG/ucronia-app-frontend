import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { Profile } from '@ucronia/domain';
import { LibraryBookLendingForm } from './library-book-lending-form';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';

describe('LibraryBookLendingForm', () => {
  let fixture: ComponentFixture<LibraryBookLendingForm>;
  let component: LibraryBookLendingForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibraryBookLendingForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(LibraryBookLendingForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('includes the selected borrower and book in the lending event', () => {
    const saved = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('book', 3);
    fixture.detectChanges();
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    const lendingDate = new Date(2026, 0, 15);
    component.form.patchValue({ lendingDate });
    component.form.get('lendingDate')?.markAsDirty();
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ book: 3, borrower: 7, lendingDate });
  });
});

describe('LibraryBookLendingForm search reset', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [LibraryBookLendingForm], providers: [provideNoopAnimations()] }));

  function type(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  it('resets lending-form searches through the standard form reset when the book changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(LibraryBookLendingForm);
    fixture.componentRef.setInput('formId', 'lending-search');
    fixture.componentRef.setInput('book', 1);
    const queries: string[] = [];
    fixture.componentInstance.searchMember.subscribe(event => queries.push(event.query));
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#lending-search-member-search'), 'previous');
    fixture.detectChanges();
    tick(100);
    fixture.componentRef.setInput('book', 2);
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();
    tick(400);
    expect(queries).not.toContain('previous');
    expect(fixture.componentInstance.form.get('book')?.value).toBe(2);
    expect(fixture.componentInstance.form.get('borrower')?.value).toBeNull();
    expect(fixture.nativeElement.querySelector('#lending-search-member-search').value).toBe('');
  }));

  it('preserves an explicitly supplied borrower regardless of input binding order', fakeAsync(() => {
    const fixture = TestBed.createComponent(LibraryBookLendingForm);
    const borrower = new Profile();
    borrower.number = 7;
    borrower.name.fullName = 'Alice';
    fixture.componentRef.setInput('borrower', borrower);
    fixture.componentRef.setInput('book', 2);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.form.get('borrower')?.value).toBe(7);
    expect(fixture.nativeElement.querySelector('p-autocomplete input').value).toBe('Alice');
  }));
});

describe('LibraryBookLendingForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { book: 3, borrower: 7, lendingDate: date }, invalid: 'lendingDate', expected: { book: 3, borrower: 7, lendingDate: date } };

  let fixture: ComponentFixture<LibraryBookLendingForm>;
  let component: LibraryBookLendingForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibraryBookLendingForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(LibraryBookLendingForm);
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
