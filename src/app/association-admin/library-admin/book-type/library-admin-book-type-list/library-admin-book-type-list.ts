
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { BookTypeCrudService } from '../book-type-crud-service/book-type-crud-service';

@Component({
  selector: 'assoc-library-admin-book-type-list',
    imports: [CrudNameList],
  templateUrl: './library-admin-book-type-list.html'
})
export class LibraryAdminBookTypeList {

  protected service = inject(BookTypeCrudService);

}
