
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { AuthorCrudService } from '../author-crud-service';

@Component({
  selector: 'assoc-library-author-list-view',
  imports: [CrudNameList],
  templateUrl: './library-author-list-view.html'
})
export class LibraryAuthorListView {

  protected service = inject(AuthorCrudService);

}
