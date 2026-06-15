import { Component, inject, OnInit } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenList } from '../user-token-list/user-token-list';

@Component({
  selector: 'access-user-token-view',
  imports: [CardModule, DrawerModule, ButtonModule, UserTokenInfo, UserTokenExtendForm, UserTokenList],
  templateUrl: './user-token-view.html'
})
export class UserTokenView implements OnInit {

  private readonly service = inject(UserTokenService);

  public data = new Page<UserToken>();

  public selectedData = new UserToken();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly editable;
  public readonly Dialog = Dialog;

  public dialog = Dialog.NONE;

  public failures = new FailureStore();

  public constructor() {
    const authService = inject(AuthService);

    this.editable = authService.hasPermission("user_token", "update");
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onExtendExpiration(date: Date): void {
    this.call(
      () => this.service.extend(this.selectedData.token, date),
      () => this.load(this.data.page)
    );
  }

  public onShowInfo(token: UserToken) {
    this.selectedData = token;
    this.dialog = Dialog.INFO;
  }

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
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
