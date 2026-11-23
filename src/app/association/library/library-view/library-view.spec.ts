import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { BookLending, BookType, Donor, GameBook, GameSystem, MemberStatus, Profile } from '@ucronia/domain';
import { UcroniaPermissions } from '@ucronia/auth';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of, Subject } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { BookReturnedEvent } from '../library-book-return-form/library-book-return-form';
import { Dialog } from '../library-dialog';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';
import { LibrarySummary } from '../model/library-summary';
import { Display, LibraryView } from './library-view';

describe('LibraryView', () => {
  let component: LibraryView;
  let fixture: ComponentFixture<LibraryView>;

  const libraryServiceMock = {
    getAllBooks: vi.fn(
    ).mockName("LibraryService.getAllBooks"),
    getOneBook: vi.fn().mockName("LibraryService.getOneBook"),
      deleteBook: vi.fn().mockName("LibraryService.deleteBook"),
      getAllGameBooks: vi.fn().mockName("LibraryService.getAllGameBooks"),
      getAllFictionBooks: vi.fn().mockName("LibraryService.getAllFictionBooks"),
      getGameSystems: vi.fn().mockName("LibraryService.getGameSystems"),
      getBookTypes: vi.fn().mockName("LibraryService.getBookTypes"),
      searchDonors: vi.fn().mockName("LibraryService.searchDonors"),
      searchMembers: vi.fn().mockName("LibraryService.searchMembers"),
      setAuthors: vi.fn().mockName("LibraryService.setAuthors"),
      setPublishers: vi.fn().mockName("LibraryService.setPublishers"),
      setGameSystem: vi.fn().mockName("LibraryService.setGameSystem"),
      setBookType: vi.fn().mockName("LibraryService.setBookType"),
      setDonation: vi.fn().mockName("LibraryService.setDonation"),
      saveBook: vi.fn().mockName("LibraryService.saveBook"),
      createGameBook: vi.fn().mockName("LibraryService.createGameBook"),
      createFictionBook: vi.fn().mockName("LibraryService.createFictionBook"),
      updateGameBook: vi.fn().mockName("LibraryService.updateGameBook"),
      updateFictionBook: vi.fn().mockName("LibraryService.updateFictionBook"),
      deleteGameBook: vi.fn().mockName("LibraryService.deleteGameBook"),
      deleteFictionBook: vi.fn().mockName("LibraryService.deleteFictionBook"),
      lend: vi.fn().mockName("LibraryService.lend"),
      return: vi.fn().mockName("LibraryService.return"),
      getSummary: vi.fn().mockName("LibraryService.getSummary"),
      getBorrower: vi.fn(
  ).mockName("LibraryService.getBorrower")
};

  const lendingServiceMock = {
    getAll: vi.fn(

  ).mockName("LibraryLendingService.getAll")
};

  const reportServiceMock = {
    downloadExcelReport: vi.fn(

  ).mockName("BookReportService.downloadExcelReport")
};

  const authServiceMock = {
    hasPermission: vi.fn().mockName("AuthService.hasPermission"), hasAnyPermission: vi.fn().mockName("AuthService.hasAnyPermission")
};

  beforeEach(async () => {
    authServiceMock.hasPermission.mockReturnValue(false);
    authServiceMock.hasAnyPermission.mockReturnValue(false);
    libraryServiceMock.searchMembers.mockClear();
    libraryServiceMock.searchMembers.mockReturnValue(of([]));
    libraryServiceMock.getAllBooks.mockReturnValue(
      of(new Page<GameBook>())
    );
    libraryServiceMock.getAllGameBooks.mockReturnValue(
      of(new Page<GameBook>())
    );
    libraryServiceMock.getGameSystems.mockReturnValue(
      of(Object.assign(new Page<GameSystem>(), { last: true }))
    );
    libraryServiceMock.getBookTypes.mockReturnValue(
      of(Object.assign(new Page<BookType>(), { last: true }))
    );
    libraryServiceMock.getSummary.mockReturnValue(
      of(new LibrarySummary())
    );
    libraryServiceMock.getBorrower.mockReturnValue(
      of(new Profile())
    );
    lendingServiceMock.getAll.mockReturnValue(
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

  it('searches active and inactive borrowers when inactive members are readable', () => {
    authServiceMock.hasPermission.mockImplementation(permission =>
      permission === UcroniaPermissions.directory.inactiveMember.read);
    const permittedFixture = TestBed.createComponent(LibraryView);

    permittedFixture.componentInstance.onSearchMembers({ query: 'Ana' });

    expect(libraryServiceMock.searchMembers).toHaveBeenCalledTimes(1);

    expect(libraryServiceMock.searchMembers).toHaveBeenCalledWith('Ana', MemberStatus.All);
  });

  it('searches active borrowers when inactive members are restricted', () => {
    component.onSearchMembers({ query: 'Ana' });

    expect(libraryServiceMock.searchMembers).toHaveBeenCalledTimes(1);

    expect(libraryServiceMock.searchMembers).toHaveBeenCalledWith('Ana', MemberStatus.Active);
  });

  it('hides the settings button without catalog permissions', () => {
    expect(fixture.nativeElement.querySelector('[routerLink="/association/library/settings"]')).toBeNull();
  });

  it('shows the settings button when a catalog is readable', () => {
    authServiceMock.hasAnyPermission.mockReturnValue(true);
    const permittedFixture = TestBed.createComponent(LibraryView);
    permittedFixture.detectChanges();
    expect(permittedFixture.nativeElement.querySelector('[routerLink="/association/library/settings"]')).not.toBeNull();
  });

  it('loads game systems and book types for the edition form in the view', () => {
    const gameSystem = new GameSystem();
    const bookType = new BookType();
    libraryServiceMock.getGameSystems.mockReturnValue(
      of(Object.assign(new Page<GameSystem>(), { last: true, content: [gameSystem] }))
    );
    libraryServiceMock.getBookTypes.mockReturnValue(
      of(Object.assign(new Page<BookType>(), { last: true, content: [bookType] }))
    );
    libraryServiceMock.getOneBook.mockReturnValue(of(new GameBook()));

    component.onShowEdit();

    expect(component.gameSystems).toEqual([gameSystem]);
    expect(component.bookTypes).toEqual([bookType]);
  });

  it('cancels the previous donor query and clears results in the view', () => {
    const previous = new Subject<Donor[]>();
    const latest = new Subject<Donor[]>();
    const donor = new Donor();
    libraryServiceMock.searchDonors.mockReturnValueOnce(previous).mockReturnValueOnce( latest);

    component.onSearchDonors('old');
    component.onSearchDonors('new');
    latest.next([donor]);
    previous.next([]);

    expect(previous.observed).toBe(false);
    expect(component.donorSearchResults).toEqual([donor]);

    component.onClearDonorSearch();
    expect(component.donorSearchResults).toEqual([]);
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
    authServiceMock.hasPermission.mockReturnValue(true);
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
    authServiceMock.hasPermission.mockReturnValue(true);
    const view = TestBed.createComponent(LibraryView).componentInstance;
    const lending = new BookLending();
    lending.returnDate = new Date();
    view.onShowLending(lending);
    view.onShowLendingReturn();
    expect(view.dialog).toBe(Dialog.LENDING_INFO);
  });

  it('returns the lending and refreshes the lending table and summary', () => {
    libraryServiceMock.return.mockReturnValue(of(new BookLending()));
    const loadLendings = vi.spyOn(component, 'loadLendings').mockReturnValue(undefined);
    const loadBooks = vi.spyOn(component, 'load').mockReturnValue(undefined);
    component.display = Display.LENDINGS;
    component.lendings.page = 2;
    component.dialog = Dialog.LENDING_RETURN;
    const event = new BookReturnedEvent(new Date(), 7, 42);
    component.onReturn(event);
    expect(libraryServiceMock.return).toHaveBeenCalledWith(event.returnDate, 7, 42);
    expect(loadLendings).toHaveBeenCalledTimes(1);
    expect(loadLendings).toHaveBeenCalledWith(2);
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

  it('ignores a delete confirmation after another book is selected', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    libraryServiceMock.deleteBook.mockClear();
    component.selectedData = Object.assign(new GameBook(), { number: 12 });
    component.onDelete(new Event('click'));

    component.selectedData = Object.assign(new GameBook(), { number: 20 });
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(libraryServiceMock.deleteBook).not.toHaveBeenCalled();
  });

  it('ignores a delete confirmation after the view is destroyed', () => {
    const confirm = vi.spyOn(TestBed.inject(ConfirmationService), 'confirm').mockReturnThis();
    libraryServiceMock.deleteBook.mockClear();
    component.selectedData = Object.assign(new GameBook(), { number: 12 });
    component.onDelete(new Event('click'));

    fixture.destroy();
    vi.mocked(confirm).mock.lastCall![0].accept?.();

    expect(libraryServiceMock.deleteBook).not.toHaveBeenCalled();
  });

  it('refreshes the list without closing a drawer opened during a return', () => {
    const response = new Subject<BookLending>();
    libraryServiceMock.return.mockReturnValue(response);
    const load = vi.spyOn(component, 'load').mockReturnValue(undefined);
    component.dialog = Dialog.LENDING_RETURN;
    component.onReturn(new BookReturnedEvent(new Date(), 7, 42));

    component.onShowLending(new BookLending());
    response.next(new BookLending());
    response.complete();

    expect(load).toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.LENDING_INFO);
  });

  it('ignores an error from a return after the drawer has been replaced', () => {
    const response = new Subject<BookLending>();
    libraryServiceMock.return.mockReturnValue(response);
    component.dialog = Dialog.LENDING_RETURN;
    component.onReturn(new BookReturnedEvent(new Date(), 7, 42));

    component.onShowLending(new BookLending());
    const clear = vi.spyOn(component.failures, 'clear').mockReturnValue(undefined);
    response.error(new Error('Return failed'));

    expect(clear).not.toHaveBeenCalled();
    expect(component.dialog).toBe(Dialog.LENDING_INFO);
  });
});

describe('Library request routing', () => {
  it('disables loan searches while routing pagination to the active tab', () => {
    TestBed.configureTestingModule({ providers: [
      { provide: LibraryService, useValue: {} },
      { provide: LibraryLendingService, useValue: {} },
      { provide: BookReportService, useValue: {} },
      { provide: ConfirmationService, useValue: {} },
      { provide: AuthService, useValue: { hasPermission: () => false, hasAnyPermission: () => false } }
    ] });
    const component = TestBed.runInInjectionContext(() => new LibraryView());
    const load = vi.spyOn(component, 'loadLendings').mockReturnValue(undefined);
    component.display = component.Display.LENDINGS;
    component.onFilter('title');
    expect(load).not.toHaveBeenCalled();
    load.mockClear();
    component.load(2);
    expect(load).toHaveBeenCalledTimes(1);
    expect(load).toHaveBeenCalledWith(2);
  });
});
