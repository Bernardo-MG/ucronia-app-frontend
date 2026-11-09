import { Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DetailRequest } from '@app/shared/request/detail-request';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityPermissions } from '@bernardo-mg/security';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { finalize, Observable, Subscription } from 'rxjs';
import { RoleChangePermission } from '../role-change-permission/role-change-permission';
import { RoleForm } from '../role-form/role-form';
import { RoleInfo } from '../role-info/role-info';
import { RoleDeleteEvent, RoleList } from '../role-list/role-list';
import { RoleService } from '../role-service';

@Component({
  selector: 'access-role-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, ButtonModule, DrawerModule, RoleForm, RoleInfo, RoleChangePermission, RoleList],
  templateUrl: './role-view.html'
})
export class RoleView implements OnInit {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(RoleService);

  public data = new Page<Role>();
  public readonly Dialog = Dialog;

  public get dialog(): Dialog {
    return this.currentDialog;
  }

  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.currentDialog = value;
    }
  }
  public failures = new FailureStore();
  public loading = false;

  public readonly permissions: Permissions;
  public resourcePermissions: ResourcePermission[] = [];
  public selectedData = new Role();
  private currentDialog = Dialog.NONE;

  private readonly detailRequest = new DetailRequest();

  private readonly drawer = viewChild(Drawer);
  private listRequest?: Subscription;

  private readonly sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission(
        SecurityPermissions.role.create
      ),
      edit: authService.hasPermission(
        SecurityPermissions.role.update
      ),
      delete: authService.hasPermission(
        SecurityPermissions.role.delete
      )
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onChangeDirection(sorting: SortingEvent): void {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.addField(
      new SortingProperty(sorting.field, direction)
    );

    this.load(this.data.page);
  }

  public onChangePermissions(role: Role): void {
    this.detailRequest.cancel();
    this.selectedData = role;
    this.loading = true;

    this.service.getAllPermissions()
      .pipe(
        finalize(() => this.finishLoading()),
        takeUntilDestroyed(this.destroyRef)
      )
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(permissions => {
        this.resourcePermissions = permissions;
        this.dialog = Dialog.PERMISSIONS;
      });
  }

  public onCreate(role: Role): void {
    this.call(
      () => this.service.create(role),
      () => this.load()
    );
  }

  public onDelete(data: RoleDeleteEvent): void {
    this.selectedData = data.role;

    this.confirmationService.confirm({
      target: data.event.currentTarget as EventTarget,
      message: `¿Quieres eliminar el rol “${data.role.name}”? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger'
      },
      accept: () => {
        this.call(
          () => this.service.delete(data.role.name),
          () => this.load()
        );
      }
    });
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onSetRolePermissions(
    permissions: ResourcePermission[]
  ): void {
    const updatedRole = new Role(
      this.selectedData.name,
      permissions
    );

    this.call(
      () => this.service.update(updatedRole),
      () => this.load(this.data.page)
    );
  }

  public onShowInfo(role: Role): void {
    this.detailRequest.cancel();
    this.selectedData = role;
    this.dialog = Dialog.INFO;
  }

  public onStartCreation(): void {
    this.detailRequest.cancel();
    this.loading = true;

    this.service.getAllPermissions()
      .pipe(
        finalize(() => this.finishLoading()),
        takeUntilDestroyed(this.destroyRef)
      )
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(permissions => {
        this.resourcePermissions = permissions;
        this.dialog = Dialog.CREATE;
      });
  }

  public load(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.loading = true;

    this.listRequest = this.service.getAll(page, this.sort)
      .pipe(
        finalize(() => this.finishLoading()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.data = response;
      });
  }

  private call(
    action: () => Observable<unknown>,
    onSuccess: () => void
  ): void {
    this.loading = true;

    action()
      .pipe(
        finalize(() => this.finishLoading()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private finishLoading(): void {
    this.loading = false;
    // Async mode changes must refresh PrimeNG's OnPush header/footer outlets.
    this.drawer()?.cd.markForCheck();
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

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  CREATE = 'create',
  PERMISSIONS = 'permissions'
}
