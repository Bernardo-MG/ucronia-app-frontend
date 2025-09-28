
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { BookTypeCrudService } from '../book-type-crud-service';

@Component({
  selector: 'assoc-library-book-type-list',
    imports: [CrudNameList],
  templateUrl: './library-book-type-list.html'
})
export class LibraryBookTypeList {

  protected service = inject(BookTypeCrudService);

}
