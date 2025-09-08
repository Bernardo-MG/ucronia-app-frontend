
import { Component, inject, Input, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryAdminListSelectionForm } from '@app/association-admin/library-admin/common/library-admin-list-selection-form/library-admin-list-selection-form';
import { LibraryAdminSelectionForm } from '@app/association-admin/library-admin/common/library-admin-selection-form/library-admin-selection-form';
import { BookReportService } from '@app/association-admin/library-admin/report/book-report-service/book-report-service';
import { Author } from '@app/domain/library/author';
import { BookLent } from '@app/domain/library/book-lent';
import { BookReturned } from '@app/domain/library/book-returned';
import { BookType } from '@app/domain/library/book-type';
import { BookUpdate } from '@app/domain/library/book-update';
import { Donation } from '@app/domain/library/donation';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';
import { GameSystem } from '@app/domain/library/game-system';
import { Publisher } from '@app/domain/library/publisher';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Observable, throwError } from 'rxjs';
import { BookAdminService } from '../book-admin-service/book-admin-service';
import { LibraryAdminBookCreationForm } from '../library-admin-book-creation-form/library-admin-book-creation-form';
import { LibraryAdminBookDonorsForm } from '../library-admin-book-donors-form/library-admin-book-donors-form';
import { LibraryAdminBookInfoEditionForm } from '../library-admin-book-info-edition-form/library-admin-book-info-edition-form';
import { LibraryAdminBookInfo } from '../library-admin-book-info/library-admin-book-info';
import { LibraryAdminBookLendingLend } from '../library-admin-book-lending/library-admin-book-lending';
import { LibraryAdminBookReturnForm } from '../library-admin-book-return-form/library-admin-book-return-form';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [RouterModule, TableModule, PanelModule, ButtonModule, ConfirmPopupModule, BadgeModule, CardModule, OverlayBadgeModule, MenuModule, DrawerModule, LibraryAdminBookInfoEditionForm, LibraryAdminBookDonorsForm, LibraryAdminBookLendingLend, LibraryAdminBookReturnForm, LibraryAdminBookInfo, LibraryAdminListSelectionForm, LibraryAdminSelectionForm, LibraryAdminBookCreationForm],
  templateUrl: './library-admin-book-list.html',
  providers: [ConfirmationService]
})
export class LibraryAdminBookList {

  private readonly router = inject(Router);

  public readonly service = inject(BookAdminService);

  private readonly reportService = inject(BookReportService);

  private readonly confirmationService = inject(ConfirmationService);

  private readonly messageService = inject(MessageService);

  public failures = new FailureStore();

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  private _pageNumber = 0;

  @Input() public set pageNumber(value: number) {
    this._pageNumber = value;
    this.load(value);
  }

  public get pageNumber() {
    return this._pageNumber;
  }

  public selectedData: FictionBook | GameBook = new GameBook();

  public data = new PaginatedResponse<FictionBook | GameBook>();

  public source: 'game' | 'fiction' = 'game';

  /**
   * Loading flag.
   */
  public loading = false;

  public loadingExcel = false;

  public readonly createable;

  public readonly editable;

  public editing = false;

  public showing = false;

  public readonly fictionEditionMenuItems: MenuItem[] = [];

  public readonly gameEditionMenuItems: MenuItem[] = [];

  public readonly dataMenuItems: MenuItem[] = [];

  public view: string = '';

  private sort = new Sorting();

  @ViewChild('fictionEditionMenu') fictionEditionMenu!: Menu;

  @ViewChild('gameEditionMenu') gameEditionMenu!: Menu;

  public get borrower() {
    return this.selectedData.lendings[this.selectedData.lendings.length - 1].borrower;
  }

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load data
    this.load(0);

    // Check permissions
    this.createable = authContainer.hasPermission("library_book", "create");
    this.editable = authContainer.hasPermission("library_book", "update");

    // Load data menu
    if (authContainer.hasPermission('library_author', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Autores',
          command: () => this.router.navigate(['/association/admin/library/authors'])
        });
    }
    if (authContainer.hasPermission('library_publisher', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Editores',
          command: () => this.router.navigate(['/association/admin/library/publishers'])
        });
    }
    if (authContainer.hasPermission('library_book_type', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Tipos',
          command: () => this.router.navigate(['/association/admin/library/types'])
        });
    }
    if (authContainer.hasPermission('library_game_system', 'view')) {
      this.dataMenuItems.push(
        {
          label: 'Sistemas',
          command: () => this.router.navigate(['/association/admin/library/systems'])
        });
    }

    // Load edition menu
    this.fictionEditionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onStartEditingView('details')
      });
    this.fictionEditionMenuItems.push(
      {
        label: 'Donantes',
        command: () => this.onStartEditingView('donors')
      });
    this.fictionEditionMenuItems.push(
      {
        label: 'Autores',
        command: () => this.onStartEditingView('authors')
      });
    this.fictionEditionMenuItems.push(
      {
        label: 'Editor',
        command: () => this.onStartEditingView('publishers')
      });
    this.fictionEditionMenuItems.push(
      {
        label: 'Préstamos',
        command: () => this.onStartEditingView('lendings')
      });


    // Load edition menu
    this.gameEditionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onStartEditingView('details')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Donantes',
        command: () => this.onStartEditingView('donors')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Autores',
        command: () => this.onStartEditingView('authors')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Editor',
        command: () => this.onStartEditingView('publishers')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Sistema',
        command: () => this.onStartEditingView('gameSystem')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Tipo',
        command: () => this.onStartEditingView('bookType')
      });
    this.gameEditionMenuItems.push(
      {
        label: 'Préstamos',
        command: () => this.onStartEditingView('lendings')
      });
  }

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    this.selectedData = book;
    if (Object.prototype.hasOwnProperty.call(book, 'gameSystem')) {
      this.gameEditionMenu.toggle(event);
    } else {
      this.fictionEditionMenu.toggle(event);
    }
  }

  public onCreate(toCreate: any): void {
    this.mutate(() => {
      if (this.source === 'game') {
        return this.service.createGameBook(toCreate);
      } else {
        return this.service.createFictionBook(toCreate);
      }
    });
  }

  public onConfirmDelete(event: Event, number: number) {
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
        if (this.source === 'game') {
          this.service.deleteGameBook(number).subscribe(r => {
            this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
            this.load(0);
          });
        } else {
          this.service.deleteFictionBook(number).subscribe(r => {
            this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
            this.load(0);
          });
        }
      }
    });
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onChangeSource(event: any) {
    this.source = event.target.value as 'game' | 'fiction';
    this.load(0);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onShowBook(book: FictionBook | GameBook) {
    this.selectedData = book;
    this.showing = true;
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .subscribe({
        next: response => {
          this.loadingExcel = false;
        },
        error: error => {
          this.loadingExcel = false;
        }
      });
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onSave(toSave: BookUpdate) {
    this.loading = true;
    if (this.source === 'game') {
      this.service.updateGameBookNew(toSave.number, toSave).subscribe({
        next: response => {
          this.interceptSave(response);
        },
        error: error => {
          this.interceptError(error);
        }
      });
    } else {
      this.service.updateFictionBookNew(toSave.number, toSave).subscribe({
        next: response => {
          this.interceptSave(response);
        },
        error: error => {
          this.interceptError(error);
        }
      });
    }
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
    this.onSave(updateDate as BookUpdate);
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
    this.onSave(updateDate as BookUpdate);
  }

  public onSetGameSystem(gameSystem: GameSystem) {
    const updateDate = {
      ...this.selectedData,
      publishers: this.selectedData.publishers.map(p => p.number),
      bookType: (this.selectedData as GameBook).bookType?.number,
      authors: this.selectedData.authors.map(a => a.number),
      gameSystem: gameSystem.number
    };
    this.onSave(updateDate as BookUpdate);
  }

  public onSetBookType(bookType: BookType) {
    const updateDate = {
      ...this.selectedData,
      publishers: this.selectedData.publishers.map(p => p.number),
      gameSystem: (this.selectedData as GameBook).gameSystem?.number,
      authors: this.selectedData.authors.map(a => a.number),
      bookType: bookType.number
    };
    this.onSave(updateDate as BookUpdate);
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
    this.onSave(updateDate as BookUpdate);
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
    this.onSave(updateDate as BookUpdate);
  }

  public getGameSystem(book: FictionBook | GameBook): GameSystem {
    return (book as GameBook).gameSystem as GameSystem;
  }

  public getBookType(book: FictionBook | GameBook): BookType {
    return (book as GameBook).bookType as BookType;
  }

  public onLend(toSave: BookLent) {
    this.service.lend(toSave).subscribe();
  }

  public onReturn(toSave: BookReturned) {
    this.service.return(toSave).subscribe();
  }

  public onCancel(): void {
    this.editing = false;
  }

  protected interceptSave(response: FictionBook | GameBook) {
    this.load(this.data.page);

    this.failures.clear();

    // Reactivate component
    this.loading = false;
    this.editing = false;
  }

  protected interceptError(error: any) {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      // No failure response
      // Just remove the failures
      this.failures.clear();
    }

    // Reactivate component
    this.loading = false;

    return throwError(() => error);
  }

  private load(page: number) {
    this.loading = true;

    if (this.source === 'game') {
      this.service.getAllGameBooks(page, this.sort).subscribe({
        next: response => {
          this.data = response;

          // Reactivate view
          this.loading = false;
        },
        error: error => {
          // Reactivate view
          this.loading = false;
        }
      });
    } else {
      this.service.getAllFictionBooks(page, this.sort).subscribe({
        next: response => {
          this.data = response;

          // Reactivate view
          this.loading = false;
        },
        error: error => {
          // Reactivate view
          this.loading = false;
        }
      });
    }
  }

  protected mutate(action: () => Observable<any>) {
    this.loading = true;
    action().subscribe({
      next: () => {
        this.failures.clear();
        this.view = 'none';
        this.load(this.data.page);
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.loading = false;
        return throwError(() => error);
      }
    });
  }

}
