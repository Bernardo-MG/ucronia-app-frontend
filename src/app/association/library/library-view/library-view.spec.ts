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
import { BookReturnedEvent } from '../library-book-return-form/library-book-return-form';
import { LibraryView, Display } from './library-view';

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

  it('opens the return form for the selected lending and cancels back to its details', () => {
    authServiceMock.hasPermission.and.returnValue(true);
    const returnFixture = TestBed.createComponent(LibraryView);
    const view = returnFixture.componentInstance;
    const lending = new BookLending();
    lending.book.number = 42;
    lending.borrower = 7;
    view.onShowLending(lending);
    view.onShowLendingReturn();
    returnFixture.detectChanges();
    expect(view.dialog).toBe(Dialog.LENDING_RETURN);
    expect(returnFixture.nativeElement.querySelector('form#library-lending-return')).not.toBeNull();
    view.onCancelLendingReturn();
    expect(view.dialog).toBe(Dialog.LENDING_INFO);
    expect(view.selectedLending).toBe(lending);
  });

  it('does not open a return form without edit permission or for a returned lending', () => {
    component.onShowLending(new BookLending());
    component.onShowLendingReturn();
    expect(component.dialog).toBe(Dialog.LENDING_INFO);
    authServiceMock.hasPermission.and.returnValue(true);
    const view = TestBed.createComponent(LibraryView).componentInstance;
    const lending = new BookLending();
    lending.returnDate = new Date();
    view.onShowLending(lending);
    view.onShowLendingReturn();
    expect(view.dialog).toBe(Dialog.LENDING_INFO);
  });

  it('returns the lending and refreshes the lending table and summary', () => {
    libraryServiceMock.return.and.returnValue(of(new BookLending()));
    const loadLendings = spyOn(component, 'loadLendings');
    const loadBooks = spyOn(component, 'load');
    component.display = Display.LENDINGS;
    component.lendings.page = 2;
    component.dialog = Dialog.LENDING_RETURN;
    const event = new BookReturnedEvent(new Date(), 7, 42);
    component.onReturn(event);
    expect(libraryServiceMock.return).toHaveBeenCalledWith(event.returnDate, 7, 42);
    expect(loadLendings).toHaveBeenCalledOnceWith(2);
    expect(loadBooks).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.NONE);
  });

  it('opens book history lending details with the current book identity and borrower name', () => {
    component.selectedData.number = 42;
    component.selectedData.title.fullTitle = 'Current book';
    component.selectedBookBorrowerNames = { 7: 'Ana Martín' };
    const lending = new BookLending();
    lending.borrower = 7;
    component.onShowBookLending(lending);
    expect(component.dialog).toBe(Dialog.LENDING_INFO);
    expect(component.selectedLending.book.number).toBe(42);
    expect(component.selectedLending.book.title.fullTitle).toBe('Current book');
    expect(component.lendingBorrowerNames[7]).toBe('Ana Martín');
    expect(lending.book.number).toBe(-1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
