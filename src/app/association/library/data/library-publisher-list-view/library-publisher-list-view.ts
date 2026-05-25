
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { PublisherCrudService } from '../publisher-crud-service';

@Component({
  imports: [CrudNameList],
  templateUrl: './library-publisher-list-view.html'
})
export class LibraryPublisherListView {

  protected service = inject(PublisherCrudService);

}
