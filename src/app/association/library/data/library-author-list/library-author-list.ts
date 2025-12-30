
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { AuthorCrudService } from '../author-crud-service';

@Component({
  selector: 'assoc-library-author-list',
  imports: [CrudNameList],
  templateUrl: './library-author-list.html'
})
export class LibraryAuthorList {

  protected service = inject(AuthorCrudService);

}
