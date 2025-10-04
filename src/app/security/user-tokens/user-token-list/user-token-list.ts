import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { AuthContainer, UserToken } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { UserTokenExtendForm } from '../user-token-extend-form/user-token-extend-form';
import { UserTokenInfo } from '../user-token-info/user-token-info';

@Component({
  selector: 'access-user-token-list',
  imports: [CardModule, TableModule, DialogModule, ButtonModule, MenuModule, UserTokenInfo, UserTokenExtendForm, DatePipe],
  templateUrl: './user-token-list.html'
})
export class UserTokenList implements OnInit {

  private readonly service = inject(UserTokenService);
  private readonly confirmationService = inject(ConfirmationService);

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
        this.mutate(() => this.service.revoke(this.selectedData.token));
      }
    });
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.load(this.data.page);
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

  public onExtendExpiration(date: Date): void {
    this.mutate(() => this.service.extend(this.selectedData.token, date));
  }

  public openEditionMenu(event: Event, token: UserToken) {

    this.editionMenuItems = [];
    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Extender expiración',
        command: () => this.onStartEditingView('extend')
      });
    this.editionMenuItems.push(
      {
        label: 'Revocar',
        command: (method) => this.onConfirmRevoke(method.originalEvent as Event)
      });

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
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
