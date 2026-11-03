import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Author } from '@ucronia/domain';
import { of } from 'rxjs';
import { LibraryService } from '../library-service';
import { LibraryBookEditionForm } from './library-book-edition-form';
import { FormGroup } from '@angular/forms';
import { LibraryConfig } from '@app/association/library/library-config';

describe('LibraryBookEditionForm', () => {
  function createForm(): LibraryBookEditionForm {
    TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations(), { provide: LibraryService, useValue: {
      getGameSystems: () => of({ content: [], last: true }),
      getBookTypes: () => of({ content: [], last: true })
    } }]
    });
    const fixture = TestBed.createComponent(LibraryBookEditionForm);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('prevents duplicate author selections and allows removal', () => {
    const component = createForm();
    const author = Object.assign(new Author(), { number: 7, name: 'Author' });
    component.onSelectAuthor(author);
    component.onSelectAuthor(author);
    expect(component.selectedAuthors).toEqual([author]);
    expect(component.form.dirty).toBeTrue();
    component.onRemoveAuthor(author);
    expect(component.selectedAuthors).toEqual([]);
  });

  it('omits an empty donation from the update payload', () => {
    const component = createForm();
    component.form.patchValue({ title: { title: 'A book' }, language: 'en' });
    component.form.get('title')?.markAsDirty();
    component.form.get('language')?.markAsDirty();
    const saved = spyOn(component.save, 'emit');
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ donation: undefined }));
  });
});

describe('LibraryBookEditionForm form submission', () => {
  const scenario = { values: { title: { title: 'A Wizard of Earthsea' }, language: 'es' }, invalid: 'language', expected: jasmine.objectContaining({ title: jasmine.objectContaining({ title: 'A Wizard of Earthsea' }), language: 'es', donation: undefined }) };

  let fixture: ComponentFixture<LibraryBookEditionForm>;
  let component: LibraryBookEditionForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations(),
        { provide: LibraryConfig, useValue: { getLanguages: () => [] } },
        { provide: LibraryService, useValue: { getGameSystems: () => of({ content: [], last: true }), getBookTypes: () => of({ content: [], last: true }) } }
      ]
    });
    fixture = TestBed.createComponent(LibraryBookEditionForm);
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
