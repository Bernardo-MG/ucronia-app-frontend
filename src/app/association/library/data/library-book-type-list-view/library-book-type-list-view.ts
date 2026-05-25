
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { BookTypeCrudService } from '../book-type-crud-service';

@Component({
  imports: [CrudNameList],
  templateUrl: './library-book-type-list-view.html'
})
export class LibraryBookTypeListView {

  protected service = inject(BookTypeCrudService);

}
