import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { UcroniaPermissions } from '@ucronia/auth';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { finalize, Observable, Subscription } from 'rxjs';
import { ActivityForm, ActivityImageOption } from '../activity-form/activity-form';
import { ActivityInfo } from '../activity-info/activity-info';
import { ActivityList } from '../activity-list/activity-list';
import { ActivityService } from '../activity-service';
import { ImageService } from '../../images/image-service';

@Component({
  imports: [TextFilter, DrawerHeader, DrawerFormActions, DrawerActions, FormsModule, ButtonModule, CardModule, DrawerModule, SelectButtonModule, ActivityList, ActivityInfo, ActivityForm],
  templateUrl: './activity-view.html'
})
export class ActivityView implements OnInit {
  private readonly confirmationService = inject(ConfirmationService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly imageService = inject(ImageService);

  private readonly service = inject(ActivityService);

  public activities = new Page<Activity>();
  public readonly Dialog = Dialog;

  public dialog = Dialog.NONE;
  public readonly displayOptions = [
    { label: 'Próximas', value: ActivityDisplay.UPCOMING },
    { label: 'Todas', value: ActivityDisplay.ALL },
    { label: 'Pasadas', value: ActivityDisplay.PAST }
  ];

  public failures = new FailureStore();
  public imageOptions: ActivityImageOption[] = [];

  public get locationCount(): number {
    return new Set(this.activities.content.map(activity => activity.location).filter(Boolean)).size;
  }

  public readonly permissions: Permissions;
  public selectedData = new Activity();
  public selectedDisplay = ActivityDisplay.UPCOMING;
  public readonly status: Status = {
    loading: false
  };

  public get upcomingSessions(): number {
    const now = new Date();
    return this.activities.content.flatMap(activity => activity.dates)
      .filter(date => new Date(date.end) >= now).length;
  }
  private imageOptionsRequest?: Subscription;
  private listRequest?: Subscription;
  private readonly sort = new Sorting();

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

  // DIALOGS

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
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

  public onDelete(event: Event) {
    const dialog = this.dialog;
    const number = this.selectedData.number;
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
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.number !== number
        ) {
          return;
        }

        this.call(
          () => this.service.delete(number),
          () => this.load()
        );
      }
    });
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
    this.loadImageOptions();
  }

  public onShowInfo(activity: Activity) {
    this.selectedData = activity;
    this.dialog = Dialog.INFO;
  }

  public onStartCreation(): void {
    this.dialog = Dialog.CREATE;
    this.loadImageOptions();
  }

  public onUpdate(toUpdate: Activity): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.load()
    );
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.listRequest?.unsubscribe();
    this.status.loading = true;
    this.listRequest = this.service.getAll(page, this.sort,
      this.selectedDisplay === ActivityDisplay.UPCOMING ? new Date() : undefined,
      this.selectedDisplay === ActivityDisplay.PAST ? new Date() : undefined)
      .pipe(finalize(() => this.status.loading = false))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(activities => this.activities = activities);
  }

  private loadImageOptions(): void {
    this.imageOptionsRequest?.unsubscribe();
    this.imageOptions = [];
    this.imageOptionsRequest = this.imageService.getAllForSelection()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(images => {
        this.imageOptions = images.map(image => ({
          name: image.name,
          description: image.description,
          number: image.number,
          url: this.imageService.contentUrl(image.number)
        }));
      });
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
