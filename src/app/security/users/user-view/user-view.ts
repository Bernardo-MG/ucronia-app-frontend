import { Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DetailRequest } from '@app/shared/request/detail-request';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, SearchRequest, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityPermissions, UserUpdate } from '@bernardo-mg/security';
import { MemberStatus, Profile } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { finalize, forkJoin, Observable, of, Subscription, switchMap } from 'rxjs';
import { UserEditionFormData, UserForm, UserFormData } from '../user-form/user-form';
import { UserInfo } from '../user-info/user-info';
import { UserDeleteEvent, UserList, UserStatusChange } from '../user-list/user-list';
import { UserService } from '../user-service';

@Component({
  selector: 'access-user-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, ButtonModule, DrawerModule, UserForm, UserInfo, UserList],
  templateUrl: './user-view.html'
})
export class UserView implements OnInit {
  private readonly confirmationService = inject(ConfirmationService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly service = inject(UserService);

  public data = new Page<User>();
  public readonly Dialog = Dialog;

  public get dialog(): Dialog {
    return this.currentDialog;
  }

  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.memberSearch.cancel();
      this.members = [];
      this.currentDialog = value;
    }
  }
  public failures = new FailureStore();
  public loading = false;
  public member = new Profile();
  public members: Profile[] = [];

  public readonly permissions: Permissions;
  public roleSelection: Role[] = [];
  public selectedData = new User();
  private currentDialog = Dialog.NONE;

  private readonly detailRequest = new DetailRequest();

  private readonly drawer = viewChild(Drawer);
  private listRequest?: Subscription;
  private readonly memberSearch = new SearchRequest();

  private readonly sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission(SecurityPermissions.user.create),
      edit: authService.hasPermission(SecurityPermissions.user.update),
      delete: authService.hasPermission(SecurityPermissions.user.delete)
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
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;

    this.sort.addField(
      new SortingProperty(sorting.field, direction)
    );

    this.load(this.data.page);
  }

  public onDelete(data: UserDeleteEvent): void {
    this.selectedData = data.user;

    this.confirmationService.confirm({
      target: data.event.currentTarget as EventTarget,
      message: `¿Quieres eliminar al usuario “${data.user.username}”? Esta acción no se puede deshacer.`,
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
          () => this.service.delete(data.user.username),
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

  public onInvite(toCreate: UserFormData): void {
    this.call(
      () => this.service.invite(toCreate),
      () => this.load()
    );
  }

  public onSearchMembers(event: { query: string }): void {
    this.memberSearch.search(event.query, query => this.service.searchMembers(query, MemberStatus.Active))
      .subscribe(members => this.members = members);
  }

  public onSetEnabled(change: UserStatusChange): void {
    this.selectedData = change.user;

    const userUpdate: UserUpdate = {
      ...change.user,
      roles: change.user.roles.map(role => role.name),
      enabled: change.enabled
    };

    this.call(
      () => this.service.update(change.user.username, userUpdate),
      () => this.load(this.data.page)
    );
  }

  public onShowUser(user: User): void {
    this.detailRequest.cancel();
    this.selectedData = user;
    this.member = new Profile();
    this.loading = true;

    this.service.getProfile(user.username)
      .pipe(
        finalize(() => this.finishLoading())
      )
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(member => {
        this.member = member ?? new Profile();
        this.dialog = Dialog.INFO;
      });
  }

  public onStartEditing(user: User): void {
    this.detailRequest.cancel();
    this.selectedData = user;
    this.loading = true;
    this.members = [];

    forkJoin({
      roles: this.service.getAllRoles(),
      member: this.service.getProfile(user.username)
    }).pipe(
      finalize(() => this.finishLoading())
    ).pipe(this.detailRequest.untilCancelled())
      .subscribe(({ roles, member }) => {
        this.roleSelection = roles;
        this.member = member ?? new Profile();
        this.dialog = Dialog.EDIT;
      });
  }

  public onStartInvitation(): void {
    this.detailRequest.cancel();
    this.loading = true;

    this.service.getAllRoles()
      .pipe(
        finalize(() => this.finishLoading())
      )
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(roles => {
        this.roleSelection = roles;
        this.dialog = Dialog.INVITE;
      });
  }

  public onUpdate(toUpdate: UserEditionFormData): void {
    const username = this.selectedData.username;
    const user: UserUpdate = {
      name: toUpdate.name,
      email: toUpdate.email,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: toUpdate.roles.map(role => role.name)
    };
    const memberNumber = toUpdate.member?.number ?? -1;
    const currentMemberNumber = this.member?.number ?? -1;

    this.call(
      () => this.service.update(username, user).pipe(
        switchMap(updated => memberNumber !== currentMemberNumber ? this.service.assignProfile(username, memberNumber) : of(updated))
      ),
      () => this.load()
    );
  }

  public load(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.loading = true;

    this.listRequest = this.service.getAll(page, this.sort)
      .pipe(
        finalize(() => this.finishLoading())
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.data = response;
      });
  }

  private call(action: () => Observable<unknown>, onSuccess: () => void): void {
    this.loading = true;

    action()
      .pipe(
        finalize(() => this.finishLoading())
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
  EDIT = 'edit',
  INVITE = 'invite'
}
