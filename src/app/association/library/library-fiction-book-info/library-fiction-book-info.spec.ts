import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/domain/library/fiction-book';
import { of } from 'rxjs';
import { BookService } from '../book-service';
import { LibraryFictionBookInfo } from './library-fiction-book-info';

describe('LibraryFictionBookInfo', () => {
  let component: LibraryFictionBookInfo;
  let fixture: ComponentFixture<LibraryFictionBookInfo>;
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
        LibraryFictionBookInfo
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
    fixture = TestBed.createComponent(LibraryFictionBookInfo);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.data).toEqual(mockBook);
    expect(component.languages).toEqual(languages);
    expect(component.loading).toBeFalse();
  });

});
