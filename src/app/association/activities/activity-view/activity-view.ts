import { Component, inject } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { ActivityCreationForm } from '../activity-creation-form/activity-creation-form';
import { ActivityEditionForm } from '../activity-edition-form/activity-edition-form';
import { ActivityInfo } from '../activity-info/activity-info';
import { ActivityList } from '../activity-list/activity-list';
import { ActivityService } from '../activity-service';

@Component({
  imports: [PanelModule, ButtonModule, DrawerModule, ActivityList, ActivityInfo, ActivityEditionForm, ActivityCreationForm],
  templateUrl: './activity-view.html'
})
export class ActivityView {

  private readonly service = inject(ActivityService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;
  public readonly status: Status = {
    loading: false
  };

  public activities = new Page<Activity>();
  private sort = new Sorting();
  public selectedData = new Activity();

  public dialog = Dialog.NONE;

  public failures = new FailureStore();

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

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
  }

  public onDelete(event: Event, id: number): void {
  }

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

  public onCreate(toCreate: Activity): void {
  }

  public onUpdate(toUpdate: Activity): void {
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
  }

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
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
