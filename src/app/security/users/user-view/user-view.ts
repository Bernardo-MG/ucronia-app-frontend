import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityPermissions, UserUpdate } from '@bernardo-mg/security';
import { MemberStatus, Profile } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, forkJoin, Observable, of, switchMap } from 'rxjs';
import { UserEditionFormData, UserForm, UserFormData } from '../user-form/user-form';
import { UserInfo } from '../user-info/user-info';
import { UserDeleteEvent, UserList, UserStatusChange } from '../user-list/user-list';
import { UserService } from '../user-service';

@Component({
  selector: 'access-user-view',
  imports: [ButtonModule, DrawerModule, UserForm, UserInfo, UserList],
  templateUrl: './user-view.html'
})
export class UserView implements OnInit {

  private readonly service = inject(UserService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public data = new Page<User>();
  public selectedData = new User();
  public member = new Profile();
  public loading = false;
  public failures = new FailureStore();
  public roleSelection: Role[] = [];
  public members: Profile[] = [];
  public dialog = Dialog.NONE;

  private sort = new Sorting();

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

  public onChangeDirection(sorting: SortingEvent): void {
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;

    this.sort.addField(
      new SortingProperty(sorting.field, direction)
    );

    this.load(this.data.page);
  }

  public onInvite(toCreate: UserFormData): void {
    this.call(
      () => this.service.invite(toCreate),
      () => this.load()
    );
  }

  public onUpdate(toUpdate: UserEditionFormData): void {
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
      () => this.service.update(this.selectedData.username, user).pipe(
        switchMap(updated => memberNumber !== currentMemberNumber ? this.service.assignProfile(this.selectedData.username, memberNumber) : of(updated))
      ),
      () => this.load()
    );
  }

  public onShowUser(user: User): void {
    this.selectedData = user;
    this.loading = true;

    this.service.getProfile(user.username)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(member => {
        this.member = member ?? new Profile();
        this.dialog = Dialog.INFO;
      });
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

  public onStartInvitation(): void {
    this.loading = true;

    this.service.getAllRoles()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(roles => {
        this.roleSelection = roles;
        this.dialog = Dialog.INVITE;
      });
  }

  public onStartEditing(user: User): void {
    this.selectedData = user;
    this.loading = true;
    this.members = [];

    forkJoin({
      roles: this.service.getAllRoles(),
      member: this.service.getProfile(user.username)
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(({ roles, member }) => {
      this.roleSelection = roles;
      this.member = member ?? new Profile();
      this.dialog = Dialog.EDIT;
    });
  }

  public onSearchMembers(event: { query: string }): void {
    this.service.searchMembers(event.query?.trim(), MemberStatus.Active)
      .subscribe(members => {
        this.members = members;
      });
  }

  public load(page: number | undefined = undefined): void {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(response => {
        this.data = response;
      });
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  private call(action: () => Observable<unknown>, onSuccess: () => void): void {
    this.loading = true;

    action()
      .pipe(
        finalize(() => this.loading = false)
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