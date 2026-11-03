import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Page } from '@bernardo-mg/request';
import { Donor, GameBook } from '@ucronia/domain';
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

  const cases = [
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

      it('cancels when another book is loaded into the form', fakeAsync(() => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        component.data = new GameBook();
        flushMicrotasks();
        expect(pending.observed).toBeFalse();
        expect(test.results(component)).toEqual([]);
      }));

      it('cancels on destruction', () => {
        const pending = new Subject<never[]>();
        service[test.method].and.returnValue(pending);
        test.search(component, 'query');
        fixture.destroy();
        expect(pending.observed).toBeFalse();
      });
    });
  }

  it('disables author and publisher searches until supported by the backend', () => {
    const inputs = fixture.nativeElement.querySelectorAll('ui-search-select input');
    expect(inputs[0].disabled).toBeTrue();
    expect(inputs[1].disabled).toBeTrue();
    expect(inputs[0].placeholder).toBe('Búsqueda no disponible');
    expect(inputs[1].placeholder).toBe('Búsqueda no disponible');
  });
});
