import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { finalize, Observable } from 'rxjs';
import { ActivityForm } from '../activity-form/activity-form';
import { ActivityInfo } from '../activity-info/activity-info';
import { ActivityList } from '../activity-list/activity-list';
import { ActivityService } from '../activity-service';

@Component({
  imports: [FormsModule, ButtonModule, CardModule, DrawerModule, IconFieldModule, InputIconModule, InputTextModule, SelectButtonModule, ActivityList, ActivityInfo, ActivityForm],
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
  public filterValue = '';
  public selectedDisplay = ActivityDisplay.UPCOMING;
  public readonly displayOptions = [
    { label: 'Próximas', value: ActivityDisplay.UPCOMING },
    { label: 'Todas', value: ActivityDisplay.ALL },
    { label: 'Pasadas', value: ActivityDisplay.PAST }
  ];
  private sort = new Sorting();
  public selectedData = new Activity();

  public dialog = Dialog.NONE;

  public failures = new FailureStore();

  public get filteredActivities(): Activity[] {
    const query = this.filterValue.trim().toLocaleLowerCase('es');
    const now = new Date();

    return this.activities.content.filter(activity => {
      const matchesQuery = !query
        || activity.title.toLocaleLowerCase('es').includes(query)
        || activity.location.toLocaleLowerCase('es').includes(query);
      const hasUpcomingDate = activity.dates.some(date => new Date(date.end) >= now);
      const matchesDisplay = this.selectedDisplay === ActivityDisplay.ALL
        || (this.selectedDisplay === ActivityDisplay.UPCOMING && hasUpcomingDate)
        || (this.selectedDisplay === ActivityDisplay.PAST && !hasUpcomingDate);

      return matchesQuery && matchesDisplay;
    });
  }

  public get upcomingSessions(): number {
    const now = new Date();
    return this.activities.content.flatMap(activity => activity.dates)
      .filter(date => new Date(date.end) >= now).length;
  }

  public get locationCount(): number {
    return new Set(this.activities.content.map(activity => activity.location.trim()).filter(Boolean)).size;
  }

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.activity.create),
      edit: authService.hasPermission(UcroniaPermissions.activity.update),
      delete: authService.hasPermission(UcroniaPermissions.activity.delete)
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

  public onUpdate(toUpdate: Activity): void {
    this.call(
      () => this.service.update(toUpdate),
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
    this.selectedData = activity;
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

enum ActivityDisplay {
  UPCOMING = 'upcoming',
  ALL = 'all',
  PAST = 'past'
}
