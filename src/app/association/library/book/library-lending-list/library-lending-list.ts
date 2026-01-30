import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { BookLending } from '@ucronia/domain';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-library-lending-list',
  imports: [TableModule, DatePipe],
  templateUrl: './library-lending-list.html'
})
export class LibraryLendingList {

  public readonly loading = input(false);
  public readonly lendings = input<BookLending[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly sort = output<SortingProperty>();
  public readonly pageChange = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.emit(new SortingProperty(sorting.field, direction));
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.pageChange.emit(page);
  }

}
