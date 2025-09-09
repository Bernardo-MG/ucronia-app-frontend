
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { AuthorCrudService } from '../author-crud-service/author-crud-service';

@Component({
  selector: 'assoc-library-admin-author-list',
  imports: [CrudNameList],
  templateUrl: './library-admin-author-list.html'
})
export class LibraryAdminAuthorList {

  protected service = inject(AuthorCrudService);

}
