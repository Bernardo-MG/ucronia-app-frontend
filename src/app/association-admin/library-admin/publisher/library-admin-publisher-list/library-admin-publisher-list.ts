
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryAdminNameForm } from '@app/association-admin/library-admin/common/library-admin-name-form/library-admin-name-form';
import { EntityCrudList } from '@app/core/layout/components/entity-list/entity-crud-list';
import { Publisher } from '@app/domain/library/publisher';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PublisherCrudService } from '../publisher-crud-service/publisher-crud-service';

@Component({
  selector: 'assoc-library-admin-publisher-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ConfirmPopupModule, ToastModule, LibraryAdminNameForm],
  templateUrl: './library-admin-publisher-list.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminPublisherList extends EntityCrudList<Publisher> {

  constructor() {
    super(
      inject(PublisherCrudService),
      "library_publisher"
    );
  }

}
