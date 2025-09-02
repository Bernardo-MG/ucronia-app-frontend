
import { Component, inject } from '@angular/core';
import { LibraryCrudNameList } from '../../common/library-crud-name-list/library-crud-name-list';
import { BookTypeCrudService } from '../book-type-crud-service/book-type-crud-service';

@Component({
  selector: 'assoc-library-admin-book-type-list',
    imports: [LibraryCrudNameList],
  templateUrl: './library-admin-book-type-list.html'
})
export class LibraryAdminBookTypeList {

  protected service = inject(BookTypeCrudService);

}
