import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/models/library/fiction-book';
import { of, throwError } from 'rxjs';
import { BookService } from '../../services/book.service';
import { LibraryFictionBookInfoContainer } from './library-fiction-book-info.container';

describe('LibraryFictionBookInfoContainer', () => {
  let component: LibraryFictionBookInfoContainer;
  let fixture: ComponentFixture<LibraryFictionBookInfoContainer>;
  let mockService: jasmine.SpyObj<BookService>;
  const languages = [{ code: 'eng', name: 'English' }, { code: 'esp', name: 'Spanish' }];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('BookService', ['getOneFictionBook', 'getLanguages']);

    await TestBed.configureTestingModule({
      imports: [
        LibraryFictionBookInfoContainer
      ],
      providers: [
        { provide: BookService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => (key === 'index' ? '1' : null) })
          }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryFictionBookInfoContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    const mockBook: FictionBook =
    {
      number: 1,
      title: { supertitle: '', title: '', subtitle: '', fullTitle: 'Test Book' },
      lent: false,
      isbn: '',
      language: '',
      publishDate: '',
      authors: [],
      lendings: [],
      publishers: [],
      donation: undefined
    };
    mockService.getOneFictionBook.and.returnValue(of(mockBook));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data).toEqual(mockBook);
    expect(component.languages).toEqual(languages);
    expect(component["waiting"]).toBeFalse();
  });

  it('should handle errors during data load', () => {
    mockService.getOneFictionBook.and.returnValue(throwError(() => new Error('Failed to load')));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component["waiting"]).toBeFalse();
    expect(component.data).toEqual(new FictionBook());
  });

  it('should call load when index param changes', () => {
    const mockBook: FictionBook =
    {
      number: 1,
      title: { supertitle: '', title: '', subtitle: '', fullTitle: 'Test Book' },
      lent: false,
      isbn: '',
      language: '',
      publishDate: '',
      authors: [],
      lendings: [],
      publishers: [],
      donation: undefined
    };
    mockService.getOneFictionBook.and.returnValue(of(mockBook));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockService.getOneFictionBook).toHaveBeenCalledWith(1);
    expect(component.data).toEqual(mockBook);
  });

  it('should render child components with correct inputs', () => {
    const mockBook: FictionBook =
    {
      number: 1,
      title: { supertitle: '', title: '', subtitle: '', fullTitle: 'Test Book' },
      lent: false,
      isbn: '',
      language: '',
      publishDate: '',
      authors: [],
      lendings: [],
      publishers: [],
      donation: undefined
    };
    mockService.getOneFictionBook.and.returnValue(of(mockBook));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    const bookDetails = fixture.debugElement.query(By.css('assoc-library-book-details'));
    const bookLendings = fixture.debugElement.query(By.css('assoc-library-book-lendings'));

    expect(bookDetails.componentInstance.data).toEqual(mockBook);
    expect(bookDetails.componentInstance.languages).toEqual(languages);
    expect(bookDetails.componentInstance.waiting).toBeFalse();

    expect(bookLendings.componentInstance.lendings).toEqual(mockBook.lendings);
  });

});
