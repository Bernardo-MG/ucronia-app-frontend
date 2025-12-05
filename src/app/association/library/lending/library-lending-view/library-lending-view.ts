
import { Component, inject } from '@angular/core';
import { BookLending } from '@app/domain/library/book-lending';
import { AuthContainer } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { LibraryLendingList } from '../library-lending-list/library-lending-list';
import { LibraryLendingService } from '../library-lending-service';

@Component({
  selector: 'assoc-library-lending-view',
  imports: [CardModule, LibraryLendingList],
  templateUrl: './library-lending-view.html'
})
export class LibraryLendingView {

  private readonly service = inject(LibraryLendingService);

  public data = new PaginatedResponse<BookLending>();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0);
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_book", "create");
  }

  public onChangeDirection(sorting: SortingProperty) {
    this.sort.addField(sorting);

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
