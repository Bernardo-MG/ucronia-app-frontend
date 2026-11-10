import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Author, BookType, Donor, FictionBook, GameBook } from '@ucronia/domain';
import { LibraryBookEditionForm } from './library-book-edition-form';
import { FormGroup } from '@angular/forms';
import { LibraryConfig } from '../library-config';

describe('LibraryBookEditionForm', () => {
  function createForm(): LibraryBookEditionForm {
    TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
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

  it('emits fiction without game fields after editing a game book', () => {
    const component = createForm();
    const game = new GameBook();
    game.bookType = new BookType();
    component.data = game;

    const fiction = new FictionBook();
    fiction.number = 42;
    fiction.title.title = 'Original';
    fiction.language = 'en';
    component.data = fiction;
    component.form.controls.title.controls.title.setValue('Updated');
    component.form.markAsDirty();

    const saved = spyOn(component.save, 'emit');
    component.onSave();

    expect(saved).toHaveBeenCalledOnceWith({
      ...fiction,
      title: { ...fiction.title, title: 'Updated' }
    });
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
        { provide: LibraryConfig, useValue: { getLanguages: () => [] } }
      ]
    });
    fixture = TestBed.createComponent(LibraryBookEditionForm);
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

describe('LibraryBookEditionForm search intents', () => {
  let fixture: ComponentFixture<LibraryBookEditionForm>;
  let component: LibraryBookEditionForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm],
      providers: [
        { provide: LibraryConfig, useValue: { getLanguages: () => [] } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryBookEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits donor search queries for the containing view', () => {
    const search = spyOn(component.searchDonors, 'emit');
    component.onSearchDonors({ query: 'old' });
    expect(search).toHaveBeenCalledOnceWith('old');
  });

  it('emits a clear intent when the input is cleared', () => {
    const clear = spyOn(component.clearDonorSearch, 'emit');
    component.onClearDonorSearch();
    expect(clear).toHaveBeenCalledOnceWith();
  });

  it('clears donor search results when a donor is selected', () => {
    const clear = spyOn(component.clearDonorSearch, 'emit');
    component.onSelectDonor(new Donor());
    expect(clear).toHaveBeenCalledOnceWith();
  });

  it('disables author and publisher searches until supported by the backend', () => {
    const inputs = fixture.nativeElement.querySelectorAll('ui-search-select input');
    expect(inputs[0].disabled).toBeTrue();
    expect(inputs[1].disabled).toBeTrue();
    expect(inputs[0].placeholder).toBe('Búsqueda no disponible');
    expect(inputs[1].placeholder).toBe('Búsqueda no disponible');
  });
});
