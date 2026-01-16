
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormWithListSelection } from '@app/shared/data/form-with-list-selection/form-with-list-selection';
import { FormWithSelection } from '@app/shared/data/form-with-selection/form-with-selection';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { BookUpdate } from '@ucronia/api';
import { Author, BookInfo, BookLending, BookLent, BookReturned, BookType, Borrower, Donation, FictionBook, GameBook, GameSystem, Publisher } from "@ucronia/domain";
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PanelModule } from 'primeng/panel';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { EMPTY, finalize, Observable, throwError } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { LibraryBookCreationForm } from '../library-book-creation-form/library-book-creation-form';
import { LibraryBookDonorsForm } from '../library-book-donors-form/library-book-donors-form';
import { LibraryBookEditionForm } from '../library-book-edition-form/library-book-edition-form';
import { LibraryBookInfo } from '../library-book-info/library-book-info';
import { LibraryBookLending } from '../library-book-lending/library-book-lending';
import { LibraryBookList } from '../library-book-list/library-book-list';
import { LibraryBookReturnForm } from '../library-book-return-form/library-book-return-form';
import { LibraryLendingList } from '../library-lending-list/library-lending-list';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';

@Component({
  selector: 'assoc-library-view',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, PanelModule, ButtonModule, CardModule, OverlayBadgeModule, MenuModule, DialogModule, SelectButtonModule, LibraryBookEditionForm, LibraryBookDonorsForm, LibraryBookLending, LibraryBookReturnForm, LibraryBookInfo, FormWithListSelection, FormWithSelection, LibraryBookCreationForm, LibraryBookList, LibraryLendingList],
  templateUrl: './library-view.html'
})
export class LibraryView implements OnInit {

  private readonly router = inject(Router);
  private readonly reportService = inject(BookReportService);
  private readonly messageService = inject(MessageService);
  public readonly service = inject(LibraryService);
  private readonly lendingsService = inject(LibraryLendingService);

  public failures = new FailureStore();

  public selectedData: FictionBook | GameBook = new GameBook();

  public data = new PaginatedResponse<FictionBook | GameBook>();
  public lendings = new PaginatedResponse<BookLending>();

  public source: 'game' | 'fiction' = 'game';
  public list: 'books' | 'lendings' = 'books';

  public stateOptions: any[] = [{ label: 'Libros', value: 'books' }, { label: 'Préstamos', value: 'lendings' }];
  public selectedTab: 'books' | 'lendings' = 'books';

  public bookOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Juegos', value: 'game' }, { label: 'Ficción', value: 'fiction' }];
  public selectedBookView: 'all' | 'game' | 'fiction' = 'game';

  /**
   * Loading flag.
   */
  public loading = false;
  public loadingExcel = false;
  public editing = false;
  public showing = false;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public readonly dataMenuItems: MenuItem[] = [];

  public view: string = '';

  private sort = new Sorting();

  private delete: (number: number) => Observable<BookInfo> = (number) => EMPTY;
  private update: (data: BookUpdate) => Observable<BookInfo> = (data) => EMPTY;
  private read: (page: number | undefined, sort: Sorting) => Observable<PaginatedResponse<FictionBook | GameBook>> = (page, sort) => EMPTY;

  @ViewChild('fictionEditionMenu') fictionEditionMenu!: Menu;
  @ViewChild('gameEditionMenu') gameEditionMenu!: Menu;

  public get borrower(): Borrower {
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].borrower;
  }

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("library_book", "create");
    this.editable = authService.hasPermission("library_book", "update");
    this.deletable = authService.hasPermission("library_book", "delete");

    // Initial operations
    this.delete = this.service.deleteGameBook.bind(this.service);
    this.update = this.service.updateGameBook.bind(this.service);
    this.read = this.service.getAllGameBooks.bind(this.service);

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
  }

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    this.selectedData = book;
    if (Object.prototype.hasOwnProperty.call(book, 'gameSystem')) {
      this.gameEditionMenu.toggle(event);
    } else {
      this.fictionEditionMenu.toggle(event);
    }
  }

  public onCreate(toCreate: { book: BookInfo, kind: 'fiction' | 'game' }): void {
    this.call(
      () => {
        if (toCreate.kind === 'game') {
          return this.service.createGameBook(toCreate.book);
        } else {
          return this.service.createFictionBook(toCreate.book);
        }
      },
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  private onUpdate(toSave: BookUpdate) {
    this.call(
      () => this.update(toSave),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onLend(toSave: BookLent) {
    this.call(
      () => this.service.lend(toSave),
      () => this.messageService.add({ severity: 'info', summary: 'Prestado', detail: 'Libro prestado', life: 3000 })
    );
  }

  public onReturn(toSave: BookReturned) {
    this.call(
      () => this.service.return(toSave),
      () => this.messageService.add({ severity: 'info', summary: 'Devuelto', detail: 'Libro devuelto', life: 3000 })
    );
  }

  public onDelete(number: number) {
    this.call(
      () => this.delete(number),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public onChangeDirection(sorting: SortingProperty) {
    this.sort.addField(sorting);

    this.load(this.data.page);
  }

  public onChangeSource(event: SelectButtonChangeEvent) {
    this.source = event.value as 'game' | 'fiction';
    if (this.source === 'game') {
      this.delete = this.service.deleteGameBook.bind(this.service);
      this.update = this.service.updateGameBook.bind(this.service);
      this.read = this.service.getAllGameBooks.bind(this.service);
    } else {
      this.delete = this.service.deleteFictionBook.bind(this.service);
      this.update = this.service.updateFictionBook.bind(this.service);
      this.read = this.service.getAllFictionBooks.bind(this.service);
    }
    this.load();
  }

  public onChangeList(event: SelectButtonChangeEvent) {
    this.list = event.value as 'books' | 'lendings';
    if (this.list === 'books') {
      this.load();
    } else {
      this.loadLendings();
    }
  }

  public onShowBook(book: FictionBook | GameBook) {
    this.selectedData = book;
    this.showing = true;
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(
        finalize(() => this.loadingExcel = false))
      .subscribe();
  }

  public onStartEditingView(event: { view: string, book: FictionBook | GameBook }): void {
    this.selectedData = event.book;
    this.view = event.view;
    this.editing = true;
  }

  public onStartView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onSetAuthors(authors: Author[]) {
    let updateDate;
    if (this.selectedData instanceof GameBook) {
      updateDate = {
        ...this.selectedData,
        publishers: this.selectedData.publishers.map(p => p.number),
        bookType: this.selectedData.bookType?.number,
        gameSystem: this.selectedData.gameSystem?.number,
        authors: authors.map(a => a.number)
      };
    } else {
      updateDate = {
        ...this.selectedData,
        publishers: this.selectedData.publishers.map(p => p.number),
        authors: authors.map(a => a.number)
      };
    }
    this.onUpdate(updateDate as BookUpdate);
  }

  public onSetPublishers(publishers: Publisher[]) {
    let updateDate;
    if (this.selectedData instanceof GameBook) {
      updateDate = {
        ...this.selectedData,
        bookType: this.selectedData.bookType?.number,
        gameSystem: this.selectedData.gameSystem?.number,
        authors: this.selectedData.authors.map(a => a.number),
        publishers: publishers.map(a => a.number)
      };
    } else {
      updateDate = {
        ...this.selectedData,
        authors: this.selectedData.authors.map(a => a.number),
        publishers: publishers.map(a => a.number)
      };
    }
    this.onUpdate(updateDate as BookUpdate);
  }

  public onSetGameSystem(gameSystem: GameSystem) {
    const updateDate = {
      ...this.selectedData,
      publishers: this.selectedData.publishers.map(p => p.number),
      bookType: (this.selectedData as GameBook).bookType?.number,
      authors: this.selectedData.authors.map(a => a.number),
      gameSystem: gameSystem.number
    };
    this.onUpdate(updateDate as BookUpdate);
  }

  public onSetBookType(bookType: BookType) {
    const updateDate = {
      ...this.selectedData,
      publishers: this.selectedData.publishers.map(p => p.number),
      gameSystem: (this.selectedData as GameBook).gameSystem?.number,
      authors: this.selectedData.authors.map(a => a.number),
      bookType: bookType.number
    };
    this.onUpdate(updateDate as BookUpdate);
  }

  public onSetDonation(donation: Donation | undefined) {
    let updateDate;
    if (this.selectedData instanceof GameBook) {
      updateDate = {
        ...this.selectedData,
        publishers: this.selectedData.publishers.map(p => p.number),
        bookType: this.selectedData.bookType?.number,
        gameSystem: this.selectedData.gameSystem?.number,
        authors: this.selectedData.authors.map(a => a.number),
        donation: donation
      };
    } else {
      updateDate = {
        ...this.selectedData,
        publishers: this.selectedData.publishers.map(p => p.number),
        authors: this.selectedData.authors.map(a => a.number),
        donation: donation
      };
    }
    this.onUpdate(updateDate as BookUpdate);
  }

  public onSaveBook(book: FictionBook | GameBook) {
    let updateDate;
    if (book instanceof GameBook) {
      updateDate = {
        ...book,
        publishers: book.publishers.map(p => p.number),
        bookType: book.bookType?.number,
        gameSystem: book.gameSystem?.number,
        authors: book.authors.map(a => a.number)
      };
    } else {
      updateDate = {
        ...book,
        publishers: book.publishers.map(p => p.number),
        authors: book.authors.map(a => a.number)
      };
    }
    this.onUpdate(updateDate as BookUpdate);
  }

  public getGameSystem(book: FictionBook | GameBook): GameSystem {
    return (book as GameBook).gameSystem as GameSystem;
  }

  public getBookType(book: FictionBook | GameBook): BookType {
    return (book as GameBook).bookType as BookType;
  }

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.read(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  public loadLendings(page: number | undefined = undefined) {
    this.loading = true;
    this.lendingsService.getAll(page, new Sorting([]))
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.lendings = response);
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.load(this.data.page);
          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}
