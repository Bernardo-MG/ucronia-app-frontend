import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { AuthService, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityPermissions } from '@bernardo-mg/security';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable, Subscription } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenList } from '../user-token-list/user-token-list';

@Component({
  selector: 'access-user-token-view',
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, DrawerModule, ButtonModule, UserTokenInfo, UserTokenExtendForm, UserTokenList],
  templateUrl: './user-token-view.html'
})
export class UserTokenView implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(UserTokenService);

  public data = new Page<UserToken>();
  public readonly Dialog = Dialog;
  public dialog = Dialog.NONE;
  public readonly editable: boolean;
  public failures = new FailureStore();
  public loading = false;
  public selectedData = new UserToken();

  private listRequest?: Subscription;
  private readonly sort = new Sorting();

  public constructor() {
    const authService = inject(AuthService);

    this.editable = authService.hasPermission(
      SecurityPermissions.userToken.update
    );
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.load();
  }

  // Event handlers
  public load(page: number | undefined = undefined): void {
    this.listRequest?.unsubscribe();
    this.loading = true;

    this.listRequest = this.service.getAll(page, this.sort)
      .pipe(
        finalize(() => this.loading = false),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(response => {
        this.data = response;
      });
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

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onExtendExpiration(date: Date): void {
    this.call(
      () => this.service.extend(this.selectedData.token, date),
      () => this.load(this.data.page)
    );
  }

  public onRevoke(token: UserToken): void {
    this.selectedData = token;

    this.call(
      () => this.service.revoke(token.token),
      () => this.load(this.data.page)
    );
  }

  public onShowInfo(token: UserToken): void {
    this.selectedData = token;
    this.dialog = Dialog.INFO;
  }

  public onStartExtend(token: UserToken): void {
    this.selectedData = token;
    this.dialog = Dialog.EXTEND;
  }

  // Private methods
  private call(
    action: () => Observable<unknown>,
    onSuccess: () => void
  ): void {
    this.loading = true;

    action()
      .pipe(
        finalize(() => this.loading = false),
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

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EXTEND = 'extend'
}
