
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  private readonly service = inject(AuthorAdminService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Author>();

  /**
   * Loading flag.
   */
  public loading = false;

  private _shownForm: 'None' | 'Creation' | 'Edition' = 'None';

  public get shownForm() {
    return this._shownForm;
  }

  public set shownForm(form) {
    this._shownForm = form;
    if (form === 'None') {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  public showForm = false;

  public readonly editable;

  public readonly createable;

  private sort = new Sorting();

  public selected: Author = new Author();

  /**
   * Failures after saving.
   */
  protected failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // First page
    this.load(0);

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
    this.shownForm = 'Edition';
  }

  public onStartCreating(): void {
    this.shownForm = 'Creation';
  }

  public onCreate(toCreate: Author): void {
    this.loading = true;
    this.service.create(toCreate).subscribe({
      next: response => {
        this.failures.clear();

        // Reactivate component
        this.shownForm = 'None';
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
        this.loading = false;

        return throwError(() => error);
      }
    });
  }

  public onUpdate(toSave: Author): void {
    this.loading = true;
    this.service.update(toSave.number, toSave).subscribe({
      next: response => {
        this.failures.clear();

        // Reactivate component
        this.shownForm = 'None';
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
        this.loading = false;

        return throwError(() => error);
      }
    });
  }

  public onCancel(): void {
    this.shownForm = 'None';
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
