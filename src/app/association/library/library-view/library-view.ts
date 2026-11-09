import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DetailRequest } from '@app/shared/request/detail-request';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, SearchRequest, Sorting, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { UcroniaPermissions } from '@ucronia/auth';
import { Author, BookLending, BookType, Donor, FictionBook, GameBook, GameSystem, MemberStatus, Profile, Publisher } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { catchError, finalize, forkJoin, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { LibraryBookCreationForm, LibraryBookCreationFormData } from '../library-book-creation-form/library-book-creation-form';
import { LibraryBookEditionForm } from '../library-book-edition-form/library-book-edition-form';
import { LibraryBookInfo } from '../library-book-info/library-book-info';
import { BookLendingEvent, LibraryBookLendingForm } from '../library-book-lending-form/library-book-lending-form';
import { LibraryBookList } from '../library-book-list/library-book-list';
import { BookReturnedEvent, LibraryBookReturnForm } from '../library-book-return-form/library-book-return-form';
import { Dialog } from '../library-dialog';
import { LibraryLendingInfo } from '../library-lending-info/library-lending-info';
import { LibraryLendingList } from '../library-lending-list/library-lending-list';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';
import { LibrarySummary } from '../model/library-summary';
import { librarySettingsPermissions } from '../settings/library-settings-permissions';

@Component({
  selector: 'assoc-library-view',
  imports: [TextFilter, LibraryLendingInfo, RouterLink, DrawerHeader, DrawerFormActions, DrawerActions, FormsModule, ButtonModule, CardModule, DrawerModule, SelectButtonModule, LibraryBookEditionForm, LibraryBookReturnForm, LibraryBookInfo, LibraryBookCreationForm, LibraryBookList, LibraryLendingList, LibraryBookLendingForm],
  templateUrl: './library-view.html'
})
export class LibraryView implements OnInit {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly lendingsService = inject(LibraryLendingService);
  private readonly reportService = inject(BookReportService);
  private readonly service = inject(LibraryService);

  public readonly bookOptions: any[] = [{ label: 'Juegos', value: BookSelection.GAME }, { label: 'Ficción', value: BookSelection.FICTION }];
  public bookTypes: BookType[] = [];
  public get borrower(): number {
    if (!this.selectedData.lendings.length) {
      return -1;
    }

    return this.selectedData.lendings[this.selectedData.lendings.length - 1].borrower;
  }
  public data = new Page<FictionBook | GameBook>();
  public readonly Dialog = Dialog;
  public get dialog(): Dialog {
    return this.currentDialog;
  }
  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.memberSearch.cancel();
      this.donorSearch.cancel();
      this.members = [];
      this.gameSystems = [];
      this.bookTypes = [];
      this.donorSearchResults = [];
      this.currentDialog = value;
    }
  }
  public readonly Display = Display;
  public display = Display.BOOKS;
  public donorSearchResults: Donor[] = [];
  public failures = new FailureStore();
  public filterValue = '';
  public gameSystems: GameSystem[] = [];
  public lendingBorrowerNames: Record<number, string> = {};
  public lendings = new Page<BookLending>();
  public get lentDate(): Date {
    // TODO: handle empty lendings
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].lendingDate;
  }
  public members: Profile[] = [];
  public readonly permissions: Permissions;
  public selectedBookBorrowerNames: Record<number, string> = {};
  public readonly selectedBookView = BookSelection.GAME;
  public selectedBorrower = new Profile();
  public selectedData: FictionBook | GameBook = new GameBook();
  public selectedLending = new BookLending();
  public readonly selectedTab = Display.BOOKS;
  public source: BookSelection = BookSelection.GAME;
  public readonly stateOptions: any[] = [{ label: 'Libros', value: Display.BOOKS }, { label: 'Préstamos', value: Display.LENDINGS }];
  public readonly status: Status = {
    loading: false,
    loadingSummary: false,
    loadingExcel: false
  };
  public summary = new LibrarySummary();

  private currentDialog = Dialog.NONE;
  private readonly detailRequest = new DetailRequest();
  private readonly donorSearch = new SearchRequest();
  private listRequest?: Subscription;
  private readonly memberSearch = new SearchRequest();
  private readonly sort = new Sorting();

  public constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      settings: authService.hasAnyPermission(librarySettingsPermissions),
      create: authService.hasPermission(UcroniaPermissions.library.book.create),
      edit: authService.hasPermission(UcroniaPermissions.library.book.update),
      delete: authService.hasPermission(UcroniaPermissions.library.book.delete)
    };


  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // Event handlers
  public downloadExcel(): void {
    this.status.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loadingExcel = false)
      )
      .subscribe();
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onCancelLendingReturn(): void {
    this.failures.clear();
    this.dialog = Dialog.LENDING_INFO;
  }

  public onChangeDirection(sorting: SortingProperty) {
    this.sort.addField(sorting);

    this.load(this.data.page);
  }

  public onChangeList(event: SelectButtonChangeEvent) {
    this.display = event.value as Display;
    if (this.display === Display.BOOKS) {
      this.load();
    } else {
      this.loadLendings();
    }
  }

  public onChangeSource(event: SelectButtonChangeEvent) {
    this.source = event.value as BookSelection;

    this.load();
  }

  public onClearDonorSearch(): void {
    this.donorSearch.cancel();
    this.donorSearchResults = [];
  }

  public onCreate(toCreate: LibraryBookCreationFormData): void {
    this.call(
      () => {
        if (toCreate.kind === 'game') {
          return this.service.createGameBook(toCreate.book);
        } else {
          return this.service.createFictionBook(toCreate.book);
        }
      },
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onDelete(event: Event) {
    const dialog = this.dialog;
    const source = this.getSelectedSource();
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.getSelectedSource() !== source ||
          this.selectedData.number !== number
        ) {
          return;
        }

        this.call(
          () => this.service.deleteBook(source, number),
          () => {
            this.load(this.data.page);
            this.loadSummary();
          }
        );
      }
    });
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onFilter(filter: string) {
    if (this.display !== Display.BOOKS) return;
    this.filterValue = filter;
    this.load();
  }

  public onFilterChange(filter: string): void {
    this.onFilter(filter);
  }

  public onLend(toSave: BookLendingEvent) {
    this.call(
      () => this.service.lend(toSave.lendingDate, toSave.borrower, toSave.book),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onReturn(toSave: BookReturnedEvent) {
    this.call(
      () => this.service.return(toSave.returnDate, toSave.borrower, toSave.book),
      () => {
        if (this.display === Display.LENDINGS) {
          this.loadLendings(this.lendings.page);
        } else {
          this.load(this.data.page);
        }
        this.loadSummary();
      }
    );
  }

  public onSaveBook(book: FictionBook | GameBook) {
    this.call(
      () => this.service.saveBook(book),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onSearchDonors(query: string): void {
    this.donorSearch.search(
      query,
      search => this.service.searchDonors(search),
      error => this.handleError(error)
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(results => this.donorSearchResults = results);
  }

  public onSearchMembers(event: { query: string }): void {
    this.memberSearch.search(event.query, query => this.service.searchMembers(query, MemberStatus.Active))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(members => this.members = members);
  }

  public onSetAuthors(authors: Author[]) {
    this.call(
      () => this.service.setAuthors(this.selectedData, authors),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onSetBookType(bookType: BookType) {
    this.call(
      () => this.service.setBookType(this.selectedData, bookType),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onSetGameSystem(gameSystem: GameSystem) {
    this.call(
      () => this.service.setGameSystem(this.selectedData, gameSystem),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onSetPublishers(publishers: Publisher[]) {
    this.call(
      () => this.service.setPublishers(this.selectedData, publishers),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onShowBook(book: FictionBook | GameBook) {
    this.detailRequest.cancel();
    this.selectedBookBorrowerNames = {};
    this.dialog = Dialog.INFO;
    this.selectedData = book;
    this.resolveBorrowerNames(book.lendings)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.detailRequest.untilCancelled()
      )
      .subscribe((borrowerNames) => {
        this.selectedBookBorrowerNames = borrowerNames;
      });
  }

  public onShowBookLending(lending: BookLending): void {
    this.lendingBorrowerNames = { ...this.lendingBorrowerNames, ...this.selectedBookBorrowerNames };
    this.onShowLending({
      ...lending,
      book: { number: this.selectedData.number, title: this.selectedData.title }
    });
  }

  public onShowEdit() {
    this.detailRequest.cancel();
    this.selectedBookBorrowerNames = {};
    this.dialog = Dialog.EDIT;
    this.loadEditOptions();
    this.withLoading(
      this.service.getOneBook(this.getSelectedSource(), this.selectedData.number)
        .pipe(
          switchMap((book) => this.resolveBorrowerNames(book.lendings)
            .pipe(
              map((borrowerNames) => ({ book, borrowerNames }))
            )
          )
        )
    )
      .pipe(this.detailRequest.untilCancelled())
    .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ book, borrowerNames }) => {
        this.selectedData = book;
        this.selectedBookBorrowerNames = borrowerNames;
      });
  }

  public onShowLending(lending: BookLending): void {
    this.selectedLending = lending;
    this.dialog = Dialog.LENDING_INFO;
  }

  public onShowLendingReturn(): void {
    if (!this.permissions.edit || this.selectedLending.returnDate || this.status.loading) {
      return;
    }

    this.failures.clear();
    this.dialog = Dialog.LENDING_RETURN;
  }

  public onStartEditingView(event: { dialog: Dialog, book: FictionBook | GameBook }): void {
    this.detailRequest.cancel();
    this.selectedData = event.book;
    if (event.dialog === Dialog.EDIT) {
      this.onShowEdit();
      return;
    }

    if (event.dialog === Dialog.LENDINGS && event.book.lent) {
      if (this.borrower > 0) {
        this.withLoading(
          this.service.getBorrower(this.borrower)
        )
          .pipe(this.detailRequest.untilCancelled())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((profile) => {
            this.selectedBorrower = profile;
            this.dialog = event.dialog;
          });
      } else {
        this.selectedBorrower = new Profile();
        this.dialog = event.dialog;
      }

      return;
    }

    this.dialog = event.dialog;
  }

  // Data loading
  public load(page: number | undefined = undefined): void {
    if (this.display === Display.LENDINGS) {
      this.loadLendings(page);
      return;
    }
    this.listRequest?.unsubscribe();
    this.listRequest = this.withLoading(
      this.service.getAllBooks(this.getSelectedSource(), page, this.sort, this.filterValue)
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => this.data = response);
  }

  private loadEditOptions(): void {
    getAllPages((page, size) => this.service.getGameSystems(page, size))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.detailRequest.untilCancelled()
      )
      .subscribe(gameSystems => this.gameSystems = gameSystems);

    getAllPages((page, size) => this.service.getBookTypes(page, size))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.detailRequest.untilCancelled()
      )
      .subscribe(bookTypes => this.bookTypes = bookTypes);
  }

  public loadLendings(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.listRequest = this.withLoading(
      this.lendingsService.getAll(page, new Sorting([]))
        .pipe(
          switchMap((response) => this.resolveBorrowerNames(response.content)
            .pipe(
              map((lendingBorrowerNames) => ({ response, lendingBorrowerNames }))
            )
          )
        )
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ response, lendingBorrowerNames }) => {
        this.lendings = response;
        this.lendingBorrowerNames = lendingBorrowerNames;
      });
  }

  private loadSummary(): void {
    this.status.loadingSummary = true;
    this.service.getSummary()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loadingSummary = false)
      )
      .subscribe(summary => this.summary = summary);
  }

  // Public methods
  public getBookType(book: FictionBook | GameBook): BookType {
    return (book as GameBook).bookType as BookType;
  }

  public getGameSystem(book: FictionBook | GameBook): GameSystem {
    return (book as GameBook).gameSystem as GameSystem;
  }

  // Private methods
  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ): void {
    const dialog = this.dialog;
    const selectedData = this.selectedData;
    const selectedLending = this.selectedLending;
    const ownsDrawer = () => !this.destroyRef.destroyed
      && this.dialog === dialog
      && this.selectedData === selectedData
      && this.selectedLending === selectedLending;

    this.status.loading = true;
    action()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
      .subscribe({
        complete: () => {
          if (this.destroyRef.destroyed) return;

          if (ownsDrawer()) {
            this.failures.clear();
            this.dialog = Dialog.NONE;
          }
          onSuccess();
        },
        error: error => {
          if (ownsDrawer()) this.handleError(error);
        }
      });
  }

  private getSelectedSource(): 'game' | 'fiction' {
    if (this.source === BookSelection.FICTION) {
      return 'fiction';
    }

    return 'game';
  }

  private resolveBorrowerNames(lendings: BookLending[]): Observable<Record<number, string>> {
    const lendingBorrowers = lendings.map(lending => lending.borrower).filter(number => number > 0);
    const borrowerNumbers = [...new Set(lendingBorrowers)];

    if (borrowerNumbers.length === 0) {
      return of({});
    }

    return forkJoin(
      borrowerNumbers.map(number =>
        this.service.getBorrower(number)
          .pipe(
            map(profile => ({ number, name: profile.name.fullName })),
            catchError(() => of({ number, name: `${number}` }))
          )
      )
    )
      .pipe(
        map(borrowers =>
          borrowers.reduce((names, borrower) => {
            names[borrower.number] = borrower.name;
            return names;
          }, {} as Record<number, string>)
        )
      );
  }

  private withLoading<T>(observable: Observable<T>): Observable<T> {
    this.status.loading = true;

    return observable.pipe(
      finalize(() => this.status.loading = false)
    );
  }

}

interface Permissions {
  settings: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
  loadingSummary: boolean;
  loadingExcel: boolean;
}

// Dialog enum moved to ../dialog.ts to avoid circular imports with LibraryBookList

export enum BookSelection {
  ALL = 'all',
  GAME = 'game',
  FICTION = 'fiction'
}

export enum Display {
  BOOKS = 'books',
  LENDINGS = 'lendings'
}
