import { Component, inject, OnInit } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { finalize, Observable, throwError } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenList } from '../user-token-list/user-token-list';

@Component({
  selector: 'access-user-token-view',
  imports: [CardModule, DialogModule, ButtonModule, UserTokenInfo, UserTokenExtendForm, UserTokenList],
  templateUrl: './user-token-view.html'
})
export class UserTokenView implements OnInit {

  private readonly service = inject(UserTokenService);
  private readonly messageService = inject(MessageService);

  public data = new Page<UserToken>();

  public selectedData = new UserToken();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;
  public editing = false;

  public readonly editable;

  public view: string = '';

  public failures = new FailureStore();

  public constructor() {
    const authService = inject(AuthService);

    this.editable = authService.hasPermission("user_token", "update");
  }

  public ngOnInit(): void {
    this.load();
  }

  public onExtendExpiration(date: Date): void {
    this.call(
      () => this.service.extend(this.selectedData.token, date),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onStartExtend(): void {
    this.view = 'extend';
    this.editing = true;
  }

  public onShowInfo(token: UserToken) {
    this.selectedData = token;
    this.showing = true;
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.load();
          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}
