
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SummaryCard, TextFilter } from '@bernardo-mg/ui';
import { Author, BookLending, BookLent, BookReturned, BookType, Borrower, Donation, Donor, FictionBook, GameBook, GameSystem, MemberStatus, PublicMember, Publisher } from '@ucronia/domain';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PanelModule } from 'primeng/panel';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { finalize, Observable } from 'rxjs';
import { LibrarySummary } from '../../model/library-summary';
import { BookReportService } from '../book-report-service';
import { LibraryBookCreationForm, LibraryBookCreationFormData } from '../library-book-creation-form/library-book-creation-form';
import { LibraryBookDonorsForm } from '../library-book-donors-form/library-book-donors-form';
import { LibraryBookEditionForm } from '../library-book-edition-form/library-book-edition-form';
import { LibraryBookInfo } from '../library-book-info/library-book-info';
import { LibraryBookLendingForm } from '../library-book-lending-form/library-book-lending-form';
import { LibraryBookList } from '../library-book-list/library-book-list';
import { LibraryBookReturnForm } from '../library-book-return-form/library-book-return-form';
import { Dialog } from '../library-dialog';
import { LibraryLendingList } from '../library-lending-list/library-lending-list';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';

@Component({
  selector: 'assoc-library-view',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, PanelModule, ButtonModule, OverlayBadgeModule, MenuModule, DrawerModule, SelectButtonModule, LibraryBookEditionForm, LibraryBookDonorsForm, LibraryBookReturnForm, LibraryBookInfo, LibraryBookCreationForm, LibraryBookList, LibraryLendingList, SummaryCard, TextFilter, LibraryBookLendingForm],
  templateUrl: './library-view.html'
})
export class LibraryView implements OnInit {

  private readonly router = inject(Router);
  private readonly reportService = inject(BookReportService);
  public readonly service = inject(LibraryService);
  private readonly lendingsService = inject(LibraryLendingService);
  private readonly confirmationService = inject(ConfirmationService);

  public failures = new FailureStore();

  private nameFilter = '';

  public selectedData: FictionBook | GameBook = new GameBook();
  public members: PublicMember[] = [];
  public donors: Donor[] = [];

  public data = new Page<FictionBook | GameBook>();
  public lendings = new Page<BookLending>();
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

  public readonly dataMenuItems: MenuItem[] = [];

  private sort = new Sorting();

  @ViewChild('fictionEditionMenu') fictionEditionMenu!: Menu;
  @ViewChild('gameEditionMenu') gameEditionMenu!: Menu;

  public Display = Display;

  public get borrower(): Borrower {
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].borrower;
  }

  public get lentDate(): Date {
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].lendingDate;
  }

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("library_book", "create"),
      edit: authService.hasPermission("library_book", "update"),
      delete: authService.hasPermission("library_book", "delete")
    };

    // Load data menu
    if (authService.hasPermission('library_author', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Autores',
          command: () => this.router.navigate(['/association/library/authors'])
        });
    }
    if (authService.hasPermission('library_publisher', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Editores',
          command: () => this.router.navigate(['/association/library/publishers'])
        });
    }
    if (authService.hasPermission('library_book_type', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Tipos',
          command: () => this.router.navigate(['/association/library/types'])
        });
    }
    if (authService.hasPermission('library_game_system', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Sistemas',
          command: () => this.router.navigate(['/association/library/systems'])
        });
    }
  }

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    this.selectedData = book;
    if (Object.prototype.hasOwnProperty.call(book, 'gameSystem')) {
      this.gameEditionMenu.toggle(event);
    } else {
      this.fictionEditionMenu.toggle(event);
    }
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

  public onLend(toSave: BookLent) {
    this.call(
      () => this.service.lend(toSave),
      () => {
        this.load(this.data.page);
        this.loadSummary();
      }
    );
  }

  public onReturn(toSave: BookReturned) {
    this.call(
      () => this.service.return(toSave),
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
    )
      .subscribe((book) => this.selectedData = book);
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

  public onSetDonation(donation: Donation | undefined) {
    this.call(
      () => this.service.setDonation(this.selectedData, donation),
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

  public onSearchMembers(event: { query: string }) {
    this.service.searchMembers(event.query?.trim(), MemberStatus.Active)
      .subscribe(members => {
        this.members = members;
      });
  }

  public onSearchDonors(event: { query: string }) {
    this.service.searchDonors(event.query?.trim())
      .subscribe(donors => {
        this.donors = donors;
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
    ).subscribe(response => this.lendings = response);
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
