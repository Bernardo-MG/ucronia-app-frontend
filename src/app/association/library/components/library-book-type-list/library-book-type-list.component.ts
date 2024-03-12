import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { BookType } from '../../models/book-type';
import { BookTypeService } from '../../services/book-type.service';

@Component({
  selector: 'library-book-type-list',
  standalone: true,
  imports: [ CommonModule, RouterModule, LayoutModule, PaginationModule, IconsModule ],
  templateUrl: './library-book-type-list.component.html'
})
export class LibraryBookTypeListComponent {

  public response = new PaginatedResponse<BookType[]>([]);

  /**
   * Loading flag.
   */
  public readingBooks = false;

  private sort = new Sort([]);

  constructor(
    private service: BookTypeService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    this.load(this.response.currentPage);
  }

  public onGoTo(page: number) {
    this.load(page);
  }

  private load(page: number) {
    this.readingBooks = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.response = response;

        // Reactivate view
        this.readingBooks = false;
      },
      error: error => {
        // Reactivate view
        this.readingBooks = false;
      }
    });
  }

}
