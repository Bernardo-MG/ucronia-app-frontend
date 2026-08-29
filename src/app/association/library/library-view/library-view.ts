
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Author, BookLending, BookType, FictionBook, GameBook, GameSystem, MemberStatus, Profile, PublicMember, Publisher } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { catchError, debounceTime, distinctUntilChanged, finalize, forkJoin, map, Observable, of, Subject, switchMap } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { LibraryBookCreationForm, LibraryBookCreationFormData } from '../library-book-creation-form/library-book-creation-form';
import { LibraryBookEditionForm } from '../library-book-edition-form/library-book-edition-form';
import { LibraryBookInfo } from '../library-book-info/library-book-info';
import { BookLendingEvent, LibraryBookLendingForm } from '../library-book-lending-form/library-book-lending-form';
import { LibraryBookList } from '../library-book-list/library-book-list';
import { BookReturnedEvent, LibraryBookReturnForm } from '../library-book-return-form/library-book-return-form';
import { Dialog } from '../library-dialog';
import { LibraryLendingList } from '../library-lending-list/library-lending-list';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';
import { LibrarySummary } from '../model/library-summary';

@Component({
  selector: 'assoc-library-view',
  imports: [FormsModule, ButtonModule, CardModule, DrawerModule, IconFieldModule, InputIconModule, InputTextModule, SelectButtonModule, LibraryBookEditionForm, LibraryBookReturnForm, LibraryBookInfo, LibraryBookCreationForm, LibraryBookList, LibraryLendingList, LibraryBookLendingForm],
  templateUrl: './library-view.html'
})
export class LibraryView implements OnInit {

  private readonly reportService = inject(BookReportService);
  private readonly service = inject(LibraryService);
  private readonly lendingsService = inject(LibraryLendingService);
  private readonly confirmationService = inject(ConfirmationService);

  public failures = new FailureStore();

  private nameFilter = '';
  public filterValue = '';
  private readonly filterSubject = new Subject<string>();

  public selectedData: FictionBook | GameBook = new GameBook();
  public selectedBorrower = new Profile();
  public members: Profile[] = [];

  public data = new Page<FictionBook | GameBook>();
  public lendings = new Page<BookLending>();
  public lendingBorrowerNames: Record<number, string> = {};
  public selectedBookBorrowerNames: Record<number, string> = {};
  public summary = new LibrarySummary();

  public source: BookSelection = BookSelection.GAME;
  public display = Display.BOOKS;

  public stateOptions: any[] = [{ label: 'Libros', value: Display.BOOKS }, { label: 'Préstamos', value: Display.LENDINGS }];
  public selectedTab = Display.BOOKS;

  public bookOptions: any[] = [{ label: 'Juegos', value: BookSelection.GAME }, { label: 'Ficción', value: BookSelection.FICTION }];
  public selectedBookView = BookSelection.GAME;

  public readonly permissions: Permissions;
  public readonly status: Status = {
    loading: false,
    loadingSummary: false,
    loadingExcel: false
  };

  public dialog = Dialog.NONE;

  public readonly Dialog = Dialog;

  private sort = new Sorting();

  public Display = Display;

  public get borrower(): number {
    if (!this.selectedData.lendings.length) {
      return -1;
    }

    return this.selectedData.lendings[this.selectedData.lendings.length - 1].borrower;
  }

  public get lentDate(): Date {
    // TODO: handle empty lendings
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].lendingDate;
  }

  constructor() {
    const authService = inject(AuthService);
    const destroyRef = inject(DestroyRef);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.library.book.create),
      edit: authService.hasPermission(UcroniaPermissions.library.book.update),
      delete: authService.hasPermission(UcroniaPermissions.library.book.delete)
    };

    this.filterSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe(filter => this.onFilter(filter));

  }

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

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
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onDelete(event: Event) {
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
      accept: () => this.call(
        () => this.service.deleteBook(this.getSelectedSource(), this.selectedData.number),
        () => {
          this.load(this.data.page);
          this.loadSummary();
        }
      )
    });
  }

  public onChangeDirection(sorting: SortingProperty) {
    this.sort.addField(sorting);

    this.load(this.data.page);
  }

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
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
      .subscribe(({ book, borrowerNames }) => {
        this.selectedData = book;
        this.selectedBookBorrowerNames = borrowerNames;
      });
  }

  public onChangeSource(event: SelectButtonChangeEvent) {
    this.source = event.value as BookSelection;

    this.load();
  }

  public onChangeList(event: SelectButtonChangeEvent) {
    this.display = event.value as Display;
    if (this.display === Display.BOOKS) {
      this.load();
    } else {
      this.loadLendings();
    }
  }

  public onShowBook(book: FictionBook | GameBook) {
    this.selectedData = book;
    this.resolveBorrowerNames(book.lendings)
      .subscribe((borrowerNames) => {
        this.selectedBookBorrowerNames = borrowerNames;
      });
    this.dialog = Dialog.INFO;
  }

  public downloadExcel() {
    this.status.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(
        finalize(() => this.status.loadingExcel = false))
      .subscribe();
  }

  public onStartEditingView(event: { dialog: Dialog, book: FictionBook | GameBook }): void {
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

  public onSetAuthors(authors: Author[]) {
    this.call(
      () => this.service.setAuthors(this.selectedData, authors),
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

  public onSetGameSystem(gameSystem: GameSystem) {
    this.call(
      () => this.service.setGameSystem(this.selectedData, gameSystem),
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

  public onSaveBook(book: FictionBook | GameBook) {
    this.call(
      () => this.service.saveBook(book),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  public onFilterChange(filter: string): void {
    this.filterSubject.next(filter);
  }

  public onSearchMembers(event: { query: string }) {
    this.service.searchMembers(event.query?.trim(), MemberStatus.Active)
      .subscribe(members => {
        this.members = members;
      });
  }

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // DATA LOADING

  public getGameSystem(book: FictionBook | GameBook): GameSystem {
    return (book as GameBook).gameSystem as GameSystem;
  }

  public getBookType(book: FictionBook | GameBook): BookType {
    return (book as GameBook).bookType as BookType;
  }

  public load(page: number | undefined = undefined) {
    this.withLoading(
      this.service.getAllBooks(this.getSelectedSource(), page, this.sort, this.nameFilter)
    ).subscribe(response => this.data = response);
  }

  public loadLendings(page: number | undefined = undefined) {
    this.withLoading(
      this.lendingsService.getAll(page, new Sorting([]))
        .pipe(
          switchMap((response) => this.resolveBorrowerNames(response.content)
            .pipe(
              map((lendingBorrowerNames) => ({ response, lendingBorrowerNames }))
            )
          )
        )
    ).subscribe(({ response, lendingBorrowerNames }) => {
      this.lendings = response;
      this.lendingBorrowerNames = lendingBorrowerNames;
    });
  }

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  private loadSummary() {
    this.status.loadingSummary = true;
    this.service.getSummary()
      .pipe(finalize(() => this.status.loadingSummary = false))
      .subscribe(r => this.summary = r);
  }

  private withLoading<T>(
    observable: Observable<T>
  ): Observable<T> {
    this.status.loading = true;

    return observable.pipe(
      finalize(() => this.status.loading = false)
    );
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
        map((borrowers) =>
          borrowers.reduce((names, borrower) => {
            names[borrower.number] = borrower.name;
            return names;
          }, {} as Record<number, string>)
        )
      );
  }

}

interface Permissions {
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
