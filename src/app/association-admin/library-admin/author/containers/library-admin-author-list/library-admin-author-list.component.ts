
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityCrudList } from '@app/core/layout/components/entity-list/entity-crud-list';
import { Author } from '@app/domain/library/author';
import { AuthContainer } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting } from '@bernardo-mg/request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from "primeng/toast";
import { Observable } from 'rxjs';
import { LibraryAdminAuthorFormComponent } from '../../components/library-admin-author-form/library-admin-author-form.component';
import { AuthorAdminService } from '../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ConfirmPopupModule, ToastModule, LibraryAdminAuthorFormComponent],
  templateUrl: './library-admin-author-list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminAuthorListContainer extends EntityCrudList<Author> {

  private readonly service = inject(AuthorAdminService);

  constructor() {
    super(
      inject(AuthContainer),
      "library_author",
      inject(MessageService),
      inject(ConfirmationService)
    );

    // First page
    this.load(0);
  }

  public onCreate(toCreate: Author): void {
    this.mutate(() => this.service.create(toCreate));
  }

  public onUpdate(toSave: Author): void {
    this.mutate(() => this.service.update(toSave.number, toSave));
  }

  protected override getAll(page: number, sort: Sorting): Observable<PaginatedResponse<Author>> {
    return this.service.getAll(page, this.sort);
  }
  
  protected override delete(data: Author): Observable<Author> {
    return this.service.delete(data.number);
  }

}
