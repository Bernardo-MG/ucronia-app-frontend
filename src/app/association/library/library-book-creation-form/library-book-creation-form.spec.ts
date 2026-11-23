import type { Mock } from 'vitest';
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
    expect(component.form.get('isbn')?.invalid).toBe(true);
    component.form.get('isbn')?.setValue('');
    expect(component.saveEnabled).toBe(true);
  });

  it('includes the selected book kind in the creation payload', () => {
    component.kind = 'fiction';
    component.form.patchValue({ title: { title: 'A book' }, language: 'en' });
    component.form.get('title')?.markAsDirty();
    component.form.get('language')?.markAsDirty();
    const saved = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    component.onSave();
    expect(saved).toHaveBeenCalledTimes(1);
    expect(saved).toHaveBeenCalledWith(expect.objectContaining({ kind: 'fiction' }));
  });
});

describe('LibraryBookCreationForm form submission', () => {
  const scenario = { values: { title: { title: 'A Wizard of Earthsea' }, language: 'es' }, invalid: 'title.title', expected: expect.objectContaining({ book: expect.objectContaining({ title: expect.objectContaining({ title: 'A Wizard of Earthsea' }), language: 'es' }), kind: 'game' }) };

  let fixture: ComponentFixture<LibraryBookCreationForm>;
  let component: LibraryBookCreationForm;
  let emitted: Mock;
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
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

    form.markAsPristine();
    emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    fixture.detectChanges();
    expect(form.valid,'explicit fixture must be valid').toBe(true);
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBe(false);
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBe(true);
    expect(form.disabled).toBe(true);
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBe(true);
    expect(form.dirty).toBe(true);
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBe(true);
    submit();
    expect(form.get(scenario.invalid)!.touched).toBe(true);
    expect(emitted).not.toHaveBeenCalled();
  });

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
