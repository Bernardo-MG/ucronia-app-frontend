import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookInfo } from '@app/domain/library/book-info';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { BookService } from '../book-service';
import { finalize, Observable } from 'rxjs';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';

@Component({
  selector: 'assoc-library-list',
  imports: [RouterModule, CardModule, TableModule],
  templateUrl: './library-list.html'
})
export class LibraryList implements OnInit {

  private readonly router = inject(Router);

  private readonly service = inject(BookService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<BookInfo>();

  public selectedData = new BookInfo();

  /**
   * Loading flag.
   */
  public loading = false;

  public source: 'game' | 'fiction' = 'game';

  private sort = new Sorting();

  public ngOnInit(): void {
    // Load books
    this.load(0);
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
    this.router.navigate([`/association/library/${this.source}/${this.selectedData.number}`]);
  }

  private load(page: number) {
    this.loading = true;

    let books: Observable<PaginatedResponse<FictionBook | GameBook>>;
    if (this.source === 'game') {
      books = this.service.getAllGameBooks(page, this.sort);
    } else {
      books = this.service.getAllFictionBooks(page, this.sort);
    }
    books
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
