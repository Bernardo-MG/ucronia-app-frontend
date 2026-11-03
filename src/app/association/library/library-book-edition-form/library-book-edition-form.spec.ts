import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { Author, Donor, GameBook } from '@ucronia/domain';
import { of, Subject } from 'rxjs';
import { LibraryService } from '../library-service';
import { LibraryBookEditionForm } from './library-book-edition-form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibraryConfig } from '../library-config';

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

describe('LibraryBookEditionForm search cancellation', () => {
  let fixture: ComponentFixture<LibraryBookEditionForm>;
  let component: LibraryBookEditionForm;
  let service: jasmine.SpyObj<LibraryService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<LibraryService>('LibraryService', [
      'searchDonors', 'getGameSystems', 'getBookTypes'
    ]);
    const page = Object.assign(new Page<never>(), { last: true, totalPages: 1 });
    service.getGameSystems.and.returnValue(of(page));
    service.getBookTypes.and.returnValue(of(page));
    await TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm],
      providers: [
        FormBuilder,
        { provide: LibraryService, useValue: service },
        { provide: LibraryConfig, useValue: { getLanguages: () => [] } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryBookEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('unsubscribes the old query before accepting the latest response', () => {
    const older = new Subject<Donor[]>();
    const latest = new Subject<Donor[]>();
    service.searchDonors.and.returnValues(older, latest);
    component.onSearchDonors({ query: 'old' });
    component.onSearchDonors({ query: 'new' });
    const latestResults: Donor[] = [];
    latest.next(latestResults);
    older.next([]);
    expect(older.observed).toBeFalse();
    expect(component.donorSearchResults).toBe(latestResults);
  });

  it('does not repopulate suggestions after selecting an item', () => {
    const pending = new Subject<Donor[]>();
    service.searchDonors.and.returnValue(pending);
    component.onSearchDonors({ query: 'query' });
    component.onSelectDonor(new Donor());
    const cleared = component.donorSearchResults;
    pending.next([]);
    expect(pending.observed).toBeFalse();
    expect(component.donorSearchResults).toBe(cleared);
  });

  it('cancels when the input is cleared', () => {
    const pending = new Subject<Donor[]>();
    service.searchDonors.and.returnValue(pending);
    component.onSearchDonors({ query: 'query' });
    component.onClearDonorSearch();
    expect(pending.observed).toBeFalse();
    expect(component.donorSearchResults).toEqual([]);
  });

  it('cancels when another book is loaded into the form', fakeAsync(() => {
    const pending = new Subject<Donor[]>();
    service.searchDonors.and.returnValue(pending);
    component.onSearchDonors({ query: 'query' });
    component.data = new GameBook();
    flushMicrotasks();
    expect(pending.observed).toBeFalse();
    expect(component.donorSearchResults).toEqual([]);
  }));

  it('cancels on destruction', () => {
    const pending = new Subject<Donor[]>();
    service.searchDonors.and.returnValue(pending);
    component.onSearchDonors({ query: 'query' });
    fixture.destroy();
    expect(pending.observed).toBeFalse();
  });

  it('disables author and publisher searches until supported by the backend', () => {
    const inputs = fixture.nativeElement.querySelectorAll('ui-search-select input');
    expect(inputs[0].disabled).toBeTrue();
    expect(inputs[1].disabled).toBeTrue();
    expect(inputs[0].placeholder).toBe('Búsqueda no disponible');
    expect(inputs[1].placeholder).toBe('Búsqueda no disponible');
  });
});
