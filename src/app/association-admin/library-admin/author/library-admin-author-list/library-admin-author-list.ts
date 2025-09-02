
import { Component, inject } from '@angular/core';
import { LibraryCrudNameList } from '../../common/library-crud-name-list/library-crud-name-list';
import { AuthorCrudService } from '../author-crud-service/author-crud-service';

@Component({
  selector: 'assoc-library-admin-author-list',
  imports: [LibraryCrudNameList],
  templateUrl: './library-admin-author-list.html'
})
export class LibraryAdminAuthorList {

  protected service = inject(AuthorCrudService);

}
