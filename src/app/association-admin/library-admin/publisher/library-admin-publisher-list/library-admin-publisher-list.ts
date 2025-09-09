
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { PublisherCrudService } from '../publisher-crud-service/publisher-crud-service';

@Component({
  selector: 'assoc-library-admin-publisher-list',
    imports: [CrudNameList],
  templateUrl: './library-admin-publisher-list.html'
})
export class LibraryAdminPublisherList {

  protected service = inject(PublisherCrudService);

}
