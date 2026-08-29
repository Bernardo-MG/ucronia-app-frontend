import { Component, inject, OnInit } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityPermissions } from '@bernardo-mg/security';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenList } from '../user-token-list/user-token-list';

@Component({
  selector: 'access-user-token-view',
  imports: [DrawerModule, ButtonModule, UserTokenInfo, UserTokenExtendForm, UserTokenList],
  templateUrl: './user-token-view.html'
})
export class UserTokenView implements OnInit {

  private readonly service = inject(UserTokenService);

  public readonly editable: boolean;
  public readonly Dialog = Dialog;

  public data = new Page<UserToken>();
  public selectedData = new UserToken();
  public loading = false;
  public dialog = Dialog.NONE;
  public failures = new FailureStore();

  private sort = new Sorting();

  public constructor() {
    const authService = inject(AuthService);

    this.editable = authService.hasPermission(
      SecurityPermissions.userToken.update
    );
  }

  public ngOnInit(): void {
    this.load();
  }

  public onShowInfo(token: UserToken): void {
    this.selectedData = token;
    this.dialog = Dialog.INFO;
  }

  public onStartExtend(token: UserToken): void {
    this.selectedData = token;
    this.dialog = Dialog.EXTEND;
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

  public onChangeDirection(sorting: SortingEvent): void {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.addField(
      new SortingProperty(sorting.field, direction)
    );

    this.load(this.data.page);
  }

  public load(page: number | undefined = undefined): void {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.data = response;
      });
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  private call(
    action: () => Observable<unknown>,
    onSuccess: () => void
  ): void {
    this.loading = true;

    action()
      .pipe(finalize(() => this.loading = false))
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