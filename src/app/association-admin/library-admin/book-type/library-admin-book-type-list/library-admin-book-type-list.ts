
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryAdminNameForm } from '@app/association-admin/library-admin/common/library-admin-name-form/library-admin-name-form';
import { EntityCrudList } from '@app/core/layout/components/entity-list/entity-crud-list';
import { BookType } from '@app/domain/library/book-type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BookTypeCrudService } from '../book-type-crud-service/book-type-crud-service';

@Component({
  selector: 'assoc-library-admin-book-type-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ConfirmPopupModule, ToastModule, LibraryAdminNameForm],
  templateUrl: './library-admin-book-type-list.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminBookTypeList extends EntityCrudList<BookType> {

  constructor() {
    super(
      inject(BookTypeCrudService),
      "library_book_type"
    );
  }

}
