import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { LibraryGameBookInfoContainer } from './library-game-book-info.container';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GameBook } from '@app/models/library/game-book';

describe('LibraryBookInfoContainer', () => {
  let component: LibraryGameBookInfoContainer;
  let fixture: ComponentFixture<LibraryGameBookInfoContainer>;
  let mockService: jasmine.SpyObj<BookService>;
  const languages = [{ code: 'eng', name: 'English' }, { code: 'esp', name: 'Spanish' }];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('BookService', ['getOne', 'getLanguages']);

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

    fixture = TestBed.createComponent(LibraryGameBookInfoContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
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
    mockService.getOne.and.returnValue(of(mockBook));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data).toEqual(mockBook);
    expect(component.languages).toEqual(languages);
    expect(component["waiting"]).toBeFalse();
  });

  it('should handle errors during data load', () => {
    mockService.getOne.and.returnValue(throwError(() => new Error('Failed to load')));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component["waiting"]).toBeFalse();
    expect(component.data).toEqual(new GameBook());
  });

  it('should call load when index param changes', () => {
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
    mockService.getOne.and.returnValue(of(mockBook));
    mockService.getLanguages.and.returnValue(languages);

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockService.getOne).toHaveBeenCalledWith(1);
    expect(component.data).toEqual(mockBook);
  });

  it('should render child components with correct inputs', () => {
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
    mockService.getOne.and.returnValue(of(mockBook));
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
