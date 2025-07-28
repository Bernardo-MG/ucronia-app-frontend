import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/models/library/fiction-book';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';
import { LibraryFictionBookInfoContainer } from './library-fiction-book-info.container';

describe('LibraryFictionBookInfoContainer', () => {
  let component: LibraryFictionBookInfoContainer;
  let fixture: ComponentFixture<LibraryFictionBookInfoContainer>;
  let mockService: jasmine.SpyObj<BookService>;
  const languages = [{ code: 'eng', name: 'English' }, { code: 'esp', name: 'Spanish' }];
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

    mockService.getLanguages.and.returnValue(languages);
    mockService.getOneFictionBook.and.returnValue(of(mockBook));
    fixture = TestBed.createComponent(LibraryFictionBookInfoContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.data).toEqual(mockBook);
    expect(component.languages).toEqual(languages);
    expect(component.waiting).toBeFalse();
  });

  it('should render child components with correct inputs', () => {
    fixture.detectChanges();

    const bookDetails = fixture.debugElement.query(By.css('assoc-library-fiction-book-details'));
    const bookLendings = fixture.debugElement.query(By.css('assoc-library-book-lendings'));

    expect(bookDetails.componentInstance.data).toEqual(mockBook);
    expect(bookDetails.componentInstance.languages).toEqual(languages);
    expect(bookDetails.componentInstance.waiting).toBeFalse();

    expect(bookLendings.componentInstance.lendings).toEqual(mockBook.lendings);
  });

});
