
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { BookTypeCrudService } from '../book-type-crud-service';

@Component({
  selector: 'assoc-library-book-type-list-view',
    imports: [CrudNameList],
  templateUrl: './library-book-type-list-view.html'
})
export class LibraryBookTypeListview {

  protected service = inject(BookTypeCrudService);

}
