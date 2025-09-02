
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryAdminNameForm } from '@app/association-admin/library-admin/common/library-admin-name-form/library-admin-name-form';
import { EntityCrudList } from '@app/core/layout/components/entity-list/entity-crud-list';
import { GameSystem } from '@app/domain/library/game-system';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GameSystemCrudService } from '../game-system-crud-service/game-system-crud-service';

@Component({
  selector: 'assoc-library-admin-game-system-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ConfirmPopupModule, ToastModule, LibraryAdminNameForm],
  templateUrl: './library-admin-game-system-list.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminGameSystemList extends EntityCrudList<GameSystem> {

  constructor() {
    super(
      inject(GameSystemCrudService),
      "library_game_system"
    );
  }

}
