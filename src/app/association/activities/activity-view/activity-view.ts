import { Component, inject } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ActivityList } from '../activity-list/activity-list';

@Component({
  imports: [PanelModule, ButtonModule, ActivityList],
  templateUrl: './activity-view.html'
})
export class ActivityView {

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("activity", "create"),
      edit: authService.hasPermission("activity", "update"),
      delete: authService.hasPermission("activity", "delete")
    };
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
