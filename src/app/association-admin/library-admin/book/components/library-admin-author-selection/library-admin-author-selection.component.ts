import { Component, input, output } from '@angular/core';
import { Author } from '@app/domain/library/author';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-library-admin-author-selection',
  imports: [TableModule],
  templateUrl: './library-admin-author-selection.component.html'
})
export class LibraryAdminAuthorSelectionComponent {

  public readonly data = input(new PaginatedResponse<Author>());

  public readonly choose = output<Author>();

  public readonly goToPage = output<number>();

  public get first() {
    return (this.data().page - 1) * this.data().size;
  }

  public readonly nameRenderer = (data: Author): string => data.name;

  public loading = false;

  public selectedData = new Author();

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data().size) + 1;
    this.goToPage.emit(page);
  }

  public onSelectRow() {
    this.choose.emit(this.selectedData);
  }

}
