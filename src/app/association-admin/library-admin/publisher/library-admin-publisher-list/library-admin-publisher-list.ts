
import { Component, inject } from '@angular/core';
import { LibraryCrudNameList } from '../../common/library-crud-name-list/library-crud-name-list';
import { PublisherCrudService } from '../publisher-crud-service/publisher-crud-service';

@Component({
  selector: 'assoc-library-admin-publisher-list',
    imports: [LibraryCrudNameList],
  templateUrl: './library-admin-publisher-list.html'
})
export class LibraryAdminPublisherList {

  protected service = inject(PublisherCrudService);

}
