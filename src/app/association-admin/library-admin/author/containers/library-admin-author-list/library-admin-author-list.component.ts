
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityCrudList } from '@app/core/layout/components/entity-list/entity-crud-list';
import { Author } from '@app/domain/library/author';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from "primeng/toast";
import { LibraryAdminNameFormComponent } from '../../../common/component/library-admin-name-form/library-admin-name-form';
import { AuthorCrudService } from '../../services/author-crud-service';

@Component({
  selector: 'assoc-library-admin-author-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ConfirmPopupModule, ToastModule, LibraryAdminNameFormComponent],
  templateUrl: './library-admin-author-list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminAuthorListContainer extends EntityCrudList<Author> {

  constructor() {
    super(
      inject(AuthorCrudService),
      "library_author"
    );
  }

}
