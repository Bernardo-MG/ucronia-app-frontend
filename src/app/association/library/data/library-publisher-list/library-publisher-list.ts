
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { PublisherCrudService } from '../publisher-crud-service';

@Component({
  selector: 'assoc-library-publisher-list',
    imports: [CrudNameList],
  templateUrl: './library-publisher-list.html'
})
export class LibraryPublisherList {

  protected service = inject(PublisherCrudService);

}
