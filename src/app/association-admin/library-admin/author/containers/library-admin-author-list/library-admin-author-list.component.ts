
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Author } from '@app/domain/library/author';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { throwError } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, LibraryAdminAuthorFormComponent],
  templateUrl: './library-admin-author-list.component.html'
})
export class LibraryAdminAuthorListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(AuthorAdminService);

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

  public data = new PaginatedResponse<Author>();

  /**
   * Loading flag.
   */
  public loading = false;

  public editing = false;

  private sort = new Sorting();

  public readonly editable;

  public readonly createable;

  public selected: Author = new Author();

  public saving = false;

  /**
   * Failures after saving.
   */
  protected failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0)
    // Check permissions
    this.createable = authContainer.hasPermission("library_author", "create");
    this.editable = authContainer.hasPermission("library_author", "update");
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

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onStartEditing(author: Author): void {
    this.selected = author;
    this.editing = true;
  }

  public onUpdate(toSave: Author): void {
    this.saving = true;
    this.service.update(toSave.number, toSave).subscribe({
      next: response => {
        this.failures.clear();

        // Reactivate component
        this.saving = false;
        this.editing = false;
        this.load(this.data.page);
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          // No failure response
          // Just remove the failures
          this.failures.clear();
        }

        // Reactivate component
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

  public onCancel(): void {
    this.editing = false;
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort).subscribe({
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
