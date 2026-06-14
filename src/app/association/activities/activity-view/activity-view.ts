import { Component, inject } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
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
  public readonly status: Status = {
    loading: false
  };

  public activities = new Page<Activity>();
  private sort = new Sorting();

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

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.activities.page);
  }

  public onShowInfo(activity: Activity) {
    this.dialog = Dialog.INFO;
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
