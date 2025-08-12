
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookReportService } from '@app/association-admin/library-admin/report/services/book-report.service';
import { Donor } from '@app/models/library/donor';
import { Publisher } from '@app/models/library/publisher';
import { AuthContainer } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BookAdminService } from '../../services/book-admin.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FictionBook } from '@app/models/library/fiction-book';
import { GameBook } from '@app/models/library/game-book';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [RouterModule, TableModule, PanelModule, ButtonModule, ConfirmPopupModule, ToastModule, BadgeModule, OverlayBadgeModule, MenuModule, DrawerModule, DataViewModule],
  templateUrl: './library-admin-book-list.container.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminBookListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

  private readonly reportService = inject(BookReportService);

  private readonly confirmationService = inject(ConfirmationService);

  private readonly messageService = inject(MessageService);

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

  public source: 'games' | 'fiction' = 'games';

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
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.service.deleteFictionBook(number).subscribe(r => {
          this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
        });
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
    this.source = event.target.value as 'games' | 'fiction';
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

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  private load(page: number) {
    this.loading = true;

    if (this.source === 'games') {
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
