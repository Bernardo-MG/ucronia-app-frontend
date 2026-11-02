import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Page } from '@bernardo-mg/request';
import { Author, Donor, GameBook, Publisher } from '@ucronia/domain';
import { of, Subject } from 'rxjs';
import { LibraryConfig } from '../library-config';
import { LibraryService } from '../library-service';
import { LibraryBookEditionForm } from './library-book-edition-form';

describe('LibraryBookEditionForm search cancellation', () => {
  let fixture: ComponentFixture<LibraryBookEditionForm>;
  let component: LibraryBookEditionForm;
  let service: jasmine.SpyObj<LibraryService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<LibraryService>('LibraryService', [
      'searchAuthors', 'searchPublishers', 'searchDonors', 'getGameSystems', 'getBookTypes'
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
    }).overrideComponent(LibraryBookEditionForm, {
      set: { template: '', imports: [] }
    }).compileComponents();
    fixture = TestBed.createComponent(LibraryBookEditionForm);
    component = fixture.componentInstance;
  });

  const cases = [
    {
      name: 'authors', method: 'searchAuthors',
      search: (form: LibraryBookEditionForm, query: string) => form.onSearchAuthors({ query }),
      clear: (form: LibraryBookEditionForm) => form.onClearAuthorSearch(),
      select: (form: LibraryBookEditionForm) => form.onSelectAuthor(new Author()),
      results: (form: LibraryBookEditionForm) => form.authorSearchResults
    },
    {
      name: 'publishers', method: 'searchPublishers',
      search: (form: LibraryBookEditionForm, query: string) => form.onSearchPublishers({ query }),
      clear: (form: LibraryBookEditionForm) => form.onClearPublisherSearch(),
      select: (form: LibraryBookEditionForm) => form.onSelectPublisher(new Publisher()),
      results: (form: LibraryBookEditionForm) => form.publisherSearchResults
    },
    {
      name: 'donors', method: 'searchDonors',
      search: (form: LibraryBookEditionForm, query: string) => form.onSearchDonors({ query }),
      clear: (form: LibraryBookEditionForm) => form.onClearDonorSearch(),
      select: (form: LibraryBookEditionForm) => form.onSelectDonor(new Donor()),
      results: (form: LibraryBookEditionForm) => form.donorSearchResults
    }
  ] as const;

  for (const test of cases) {
    describe(test.name, () => {
      it('unsubscribes the old query before accepting the latest response', () => {
        const older = new Subject<never[]>();
        const latest = new Subject<never[]>();
        service[test.method].and.returnValues(older, latest);
        test.search(component, 'old');
        test.search(component, 'new');
        const latestResults: never[] = [];
        latest.next(latestResults);
        older.next([]);
        expect(older.observed).toBeFalse();
        expect(test.results(component)).toBe(latestResults);
      });

      it('does not repopulate suggestions after selecting an item', () => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        test.select(component);
        const cleared = test.results(component);
        pending.next([]);
        expect(pending.observed).toBeFalse();
        expect(test.results(component)).toBe(cleared);
      });

      it('cancels when the input is cleared', () => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        test.clear(component);
        expect(pending.observed).toBeFalse();
        expect(test.results(component)).toEqual([]);
      });

      it('cancels when another book is loaded into the form', () => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        component.data = new GameBook();
        expect(pending.observed).toBeFalse();
        expect(test.results(component)).toEqual([]);
      });

      it('cancels on destruction', () => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        fixture.destroy();
        expect(pending.observed).toBeFalse();
      });
    });
  }

  it('keeps different search fields independent', () => {
    const authors = new Subject<Author[]>();
    const publishers = new Subject<Publisher[]>();
    const donors = new Subject<Donor[]>();
    service.searchAuthors.and.returnValue(authors);
    service.searchPublishers.and.returnValue(publishers);
    service.searchDonors.and.returnValue(donors);
    component.onSearchAuthors({ query: 'author' });
    component.onSearchPublishers({ query: 'publisher' });
    component.onSearchDonors({ query: 'donor' });
    component.onClearAuthorSearch();
    expect(authors.observed).toBeFalse();
    expect(publishers.observed).toBeTrue();
    expect(donors.observed).toBeTrue();
  });
});
