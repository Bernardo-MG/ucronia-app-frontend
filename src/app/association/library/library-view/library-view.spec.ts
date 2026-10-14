import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { BookLending, GameBook, Profile } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { Dialog } from '../library-dialog';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';
import { LibrarySummary } from '../model/library-summary';
import { LibraryView } from './library-view';

describe('LibraryView', () => {
  let component: LibraryView;
  let fixture: ComponentFixture<LibraryView>;

  const libraryServiceMock = jasmine.createSpyObj<LibraryService>(
    'LibraryService',
    [
      'getAllBooks',
      'getOneBook',
      'deleteBook',
      'getAllGameBooks',
      'getAllFictionBooks',
      'getGameSystems',
      'getBookTypes',
      'searchAuthors',
      'searchPublishers',
      'setAuthors',
      'setPublishers',
      'setGameSystem',
      'setBookType',
      'setDonation',
      'saveBook',
      'createGameBook',
      'createFictionBook',
      'updateGameBook',
      'updateFictionBook',
      'deleteGameBook',
      'deleteFictionBook',
      'lend',
      'return',
      'getSummary',
      'getBorrower'
    ]
  );

  const lendingServiceMock = jasmine.createSpyObj<LibraryLendingService>(
    'LibraryLendingService',
    ['getAll']
  );

  const reportServiceMock = jasmine.createSpyObj<BookReportService>(
    'BookReportService',
    ['downloadExcelReport']
  );

  const authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission', 'hasAnyPermission']);

  beforeEach(async () => {
    authServiceMock.hasPermission.and.returnValue(false);
    authServiceMock.hasAnyPermission.and.returnValue(false);
    libraryServiceMock.getAllBooks.and.returnValue(
      of(new Page<GameBook>())
    );
    libraryServiceMock.getAllGameBooks.and.returnValue(
      of(new Page<GameBook>())
    );
    libraryServiceMock.getSummary.and.returnValue(
      of(new LibrarySummary())
    );
    libraryServiceMock.getBorrower.and.returnValue(
      of(new Profile())
    );
    lendingServiceMock.getAll.and.returnValue(
      of(new Page<BookLending>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryView
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        ConfirmationService,
        provideRouter([]),
        provideAnimationsAsync(),
        { provide: LibraryService, useValue: libraryServiceMock },
        { provide: LibraryLendingService, useValue: lendingServiceMock },
        { provide: BookReportService, useValue: reportServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('hides the settings button without catalog permissions', () => {
    expect(fixture.nativeElement.querySelector('[routerLink="/association/library/settings"]')).toBeNull();
  });

  it('shows the settings button when a catalog is readable', () => {
    authServiceMock.hasAnyPermission.and.returnValue(true);
    const permittedFixture = TestBed.createComponent(LibraryView);
    permittedFixture.detectChanges();
    expect(permittedFixture.nativeElement.querySelector('[routerLink="/association/library/settings"]')).not.toBeNull();
  });

  it('opens the selected lending in the info drawer and closes it', () => {
    const lending = new BookLending();
    lending.book.title.fullTitle = 'Selected book';
    lending.borrower = 7;
    component.lendingBorrowerNames = { 7: 'Borrower name' };
    component.onShowLending(lending);
    fixture.detectChanges();
    expect(component.selectedLending).toBe(lending);
    expect(component.dialog).toBe(Dialog.LENDING_INFO);
    const info = fixture.nativeElement.querySelector('assoc-library-lending-info');
    expect(info.textContent).toContain('Selected book');
    expect(info.textContent).toContain('Borrower name');
    component.onDrawerVisibleChange(false);
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
