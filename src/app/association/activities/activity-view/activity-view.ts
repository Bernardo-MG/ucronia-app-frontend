import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable } from 'rxjs';
import { ActivityCreationForm } from '../activity-creation-form/activity-creation-form';
import { ActivityEditionForm } from '../activity-edition-form/activity-edition-form';
import { ActivityInfo } from '../activity-info/activity-info';
import { ActivityList } from '../activity-list/activity-list';
import { ActivityService } from '../activity-service';

@Component({
  imports: [PanelModule, ButtonModule, DrawerModule, ActivityList, ActivityInfo, ActivityEditionForm, ActivityCreationForm],
  templateUrl: './activity-view.html'
})
export class ActivityView implements OnInit {

  private readonly service = inject(ActivityService);
  private readonly confirmationService = inject(ConfirmationService);

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

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.activities.page);
  }

  public onCreate(toCreate: Activity): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.load()
    );
  }

  public onUpdate(toCreate: Activity): void {
    this.call(
      () => this.service.update(toCreate),
      () => this.load()
    );
  }

  public onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.call(
        () => this.service.delete(this.selectedData.number),
        () => this.load()
      )
    });
  }

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
  }

  public onShowInfo(activity: Activity) {
    this.dialog = Dialog.INFO;
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.status.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(activities => this.activities = activities);
  }

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
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
