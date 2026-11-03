import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LibraryBookCreationForm } from './library-book-creation-form';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { LibraryConfig } from '@app/association/library/library-config';

describe('LibraryBookCreationForm', () => {
  let component: LibraryBookCreationForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibraryBookCreationForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    const fixture = TestBed.createComponent(LibraryBookCreationForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('rejects malformed ISBNs but accepts an omitted optional ISBN', () => {
    component.form.patchValue({ title: { title: 'A book' }, language: 'en', isbn: 'invalid' });
    component.form.get('title')?.markAsDirty();
    component.form.get('language')?.markAsDirty();
    component.form.get('isbn')?.markAsDirty();
    expect(component.form.get('isbn')?.invalid).toBeTrue();
    component.form.get('isbn')?.setValue('');
    expect(component.saveEnabled).toBeTrue();
  });

  it('includes the selected book kind in the creation payload', () => {
    component.kind = 'fiction';
    component.form.patchValue({ title: { title: 'A book' }, language: 'en' });
    component.form.get('title')?.markAsDirty();
    component.form.get('language')?.markAsDirty();
    const saved = spyOn(component.save, 'emit');
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ kind: 'fiction' }));
  });
});

describe('LibraryBookCreationForm form submission', () => {
  const scenario = { values: { title: { title: 'A Wizard of Earthsea' }, language: 'es' }, invalid: 'title.title', expected: jasmine.objectContaining({ book: jasmine.objectContaining({ title: jasmine.objectContaining({ title: 'A Wizard of Earthsea' }), language: 'es' }), kind: 'game' }) };

  let fixture: ComponentFixture<LibraryBookCreationForm>;
  let component: LibraryBookCreationForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibraryBookCreationForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations(),
        { provide: LibraryConfig, useValue: { getLanguages: () => [] } }
      ]
    });
    fixture = TestBed.createComponent(LibraryBookCreationForm);
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
