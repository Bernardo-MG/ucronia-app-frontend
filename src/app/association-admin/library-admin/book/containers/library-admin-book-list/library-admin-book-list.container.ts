
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookReportService } from '@app/association-admin/library-admin/report/services/book-report.service';
import { Author } from '@app/models/library/author';
import { Donation } from '@app/models/library/donation';
import { Donor } from '@app/models/library/donor';
import { FictionBook } from '@app/models/library/fiction-book';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { throwError } from 'rxjs';
import { LibraryAdminBookDonorsFormComponent } from '../../components/library-admin-book-donors-form/library-admin-book-donors-form.component';
import { LibraryAdminBookInfoEditionFormComponent } from '../../components/library-admin-book-info-edition-form/library-admin-book-info-edition-form';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [RouterModule, TableModule, PanelModule, ButtonModule, ConfirmPopupModule, ToastModule, BadgeModule, OverlayBadgeModule, MenuModule, DrawerModule, DataViewModule, CardModule, LibraryAdminBookInfoEditionFormComponent, LibraryAdminBookDonorsFormComponent],
  templateUrl: './library-admin-book-list.container.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminBookListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

  private readonly reportService = inject(BookReportService);

  private readonly confirmationService = inject(ConfirmationService);

  private readonly messageService = inject(MessageService);

  public failures = new FailureStore();

  public languages: Language[] = [];

  public authorsSelection = new PaginatedResponse<Author>();

  public publishersSelection = new PaginatedResponse<Publisher>();

  public donorPage = new PaginatedResponse<Person>();

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

  public readonly createPermission;

  public get routerLink(): string {
    return `${this.source}/register`;
  }

  public editable = false;

  public editing = false;

  public readonly editionMenu: MenuItem[] = [];

  public view: string = '';

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    this.languages = this.service.getLanguages();

    this.editable = authContainer.hasPermission("library_book", "update");

    // Load books
    this.load(0);
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_book", "create");

    // Load edition menu
    this.editionMenu.push(
      {
        label: 'Datos',
        command: () => this.onStartEditingView('details')
      });
    this.editionMenu.push(
      {
        label: 'Donantes',
        command: () => this.onStartEditingView('donors')
      });
  }

  public donors(book: FictionBook | GameBook) {
    let data: Donor[];

    if (book.donation) {
      data = book.donation.donors;
    } else {
      data = [];
    }

    return data.map(e => e.name.fullName).join(", ");
  }

  public publishers(book: FictionBook | GameBook) {
    let data: Publisher[];

    if (book.publishers) {
      data = book.publishers;
    } else {
      data = [];
    }

    return data.map(e => e.name).join(", ");
  }

  public authors(book: FictionBook | GameBook) {
    let data: Publisher[];

    if (book.authors) {
      data = book.authors;
    } else {
      data = [];
    }

    return data.map(e => e.name).join(", ");
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

  public onSelectRow() {
    this.router.navigate([`/association/admin/library/books/${this.source}/${this.selectedData.number}`]);
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
  public onSelect(selection: FictionBook | GameBook) {
    this.selectedData = selection;
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onSave(toSave: FictionBook | GameBook) {
    this.loading = true;
    if (this.source === 'game') {
      this.service.updateGameBook(toSave.number, toSave as GameBook).subscribe({
        next: response => {
          this.interceptSave(response);
        },
        error: error => {
          this.interceptError(error);
        }
      });
    } else {
      this.service.updateFictionBook(toSave.number, toSave as FictionBook).subscribe({
        next: response => {
          this.interceptSave(response);
        },
        error: error => {
          this.interceptError(error);
        }
      });
    }
  }

  public onSetDonation(donation: Donation) {
    this.selectedData.donation = donation;
    this.onSave(this.selectedData);
  }

  public onGoToAuthorPage(page: number) {
    this.service.getAuthors(page).subscribe({
      next: response => {
        this.authorsSelection = response;
      },
      error: error => {
      }
    });
  }

  public onGoToPublisherPage(page: number) {
    this.service.getPublishers(page).subscribe({
      next: response => {
        this.publishersSelection = response;
      },
      error: error => {
      }
    });
  }

  public onGoToDonorPage(page: number) {
    this.service.getDonors(page).subscribe({
      next: response => {
        this.donorPage = response;
      },
      error: error => {
      }
    });
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

}
