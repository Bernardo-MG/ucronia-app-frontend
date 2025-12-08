import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { AuthContainer, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenList } from '../user-token-list/user-token-list';

@Component({
  selector: 'access-user-token-view',
  imports: [CardModule, TableModule, DialogModule, ButtonModule, MenuModule, UserTokenInfo, UserTokenExtendForm, UserTokenList, DatePipe],
  templateUrl: './user-token-view.html'
})
export class UserTokenView implements OnInit {

  private readonly service = inject(UserTokenService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  public editionMenuItems: MenuItem[] = [];

  @ViewChild('editionMenu') editionMenu!: Menu;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<UserToken>();

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
    const authContainer = inject(AuthContainer);

    this.editable = authContainer.hasPermission("user_token", "update");
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onConfirmRevoke(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer revocar? Esta acción no es revertible',
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
        this.call(
          () => this.service.revoke(this.selectedData.token),
          () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
        );
      }
    });
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

  public openEditionMenu(event: Event, token: UserToken) {

    this.editionMenuItems = [];
    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Extender expiración',
        command: () => this.onStartEditingView('extend')
      }
    );
    if (!token.revoked) {
      this.editionMenuItems.push(
        {
          label: 'Revocar',
          command: (method) => this.onConfirmRevoke(method.originalEvent as Event)
        }
      );
    }

    this.selectedData = token;
    this.editionMenu.toggle(event);
  }

  public onShowInfo(token: UserToken) {
    this.selectedData = token;
    this.showing = true;
  }

  private onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public load(page: number) {
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
          this.load(0);
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
