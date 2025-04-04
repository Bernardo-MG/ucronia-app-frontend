import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GameBook } from '@app/models/library/game-book';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';
import { LibraryGameBookInfoContainer } from './library-game-book-info.container';

describe('LibraryGameBookInfoContainer', () => {
  let component: LibraryGameBookInfoContainer;
  let fixture: ComponentFixture<LibraryGameBookInfoContainer>;
  let mockService: jasmine.SpyObj<BookService>;
  const languages = [{ code: 'eng', name: 'English' }, { code: 'esp', name: 'Spanish' }];
  const mockBook: GameBook =
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
    donation: undefined,
    bookType: undefined,
    gameSystem: undefined
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('BookService', ['getOneGameBook', 'getLanguages']);

    await TestBed.configureTestingModule({
      imports: [
        LibraryGameBookInfoContainer
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
    mockService.getOneGameBook.and.returnValue(of(mockBook));
    fixture = TestBed.createComponent(LibraryGameBookInfoContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.data).toEqual(mockBook);
    expect(component.languages).toEqual(languages);
    expect(component["waiting"]).toBeFalse();
  });

  it('should render child components with correct inputs', () => {
    fixture.detectChanges();

    const bookDetails = fixture.debugElement.query(By.css('assoc-library-game-book-details'));
    const bookLendings = fixture.debugElement.query(By.css('assoc-library-book-lendings'));

    expect(bookDetails.componentInstance.data).toEqual(mockBook);
    expect(bookDetails.componentInstance.languages).toEqual(languages);
    expect(bookDetails.componentInstance.waiting).toBeFalse();

    expect(bookLendings.componentInstance.lendings).toEqual(mockBook.lendings);
  });

});
