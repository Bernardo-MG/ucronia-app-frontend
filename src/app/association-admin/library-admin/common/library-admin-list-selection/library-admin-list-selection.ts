import { Component, input, output } from '@angular/core';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-library-admin-list-selection',
  imports: [TableModule],
  templateUrl: './library-admin-list-selection.html'
})
export class LibraryAdminListSelection<T> {

  public readonly data = input(new PaginatedResponse<T>());

  public readonly heading = input('Data');

  public readonly nameRenderer = input((row: T) => (row as any).name);

  public readonly choose = output<T>();

  public readonly goToPage = output<number>();

  public get first() {
    return (this.data().page - 1) * this.data().size;
  }

  public loading = false;

  public selectedData: T | undefined;

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data().size) + 1;
    this.goToPage.emit(page);
  }

  public onSelectRow() {
    if (this.selectedData) {
      this.choose.emit(this.selectedData);
    }
  }

}
