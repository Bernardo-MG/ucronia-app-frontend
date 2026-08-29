import { DatePipe } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { UserToken } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type TokenStatus =
  | 'Vigente'
  | 'Consumido'
  | 'Revocado'
  | 'Expirado';

type TokenSeverity =
  | 'success'
  | 'warn'
  | 'danger';

@Component({
  selector: 'access-user-token-list',
  imports: [TableModule, ButtonModule, MenuModule, TagModule, DatePipe],
  templateUrl: './user-token-list.html'
})
export class UserTokenList {

  private readonly confirmationService =
    inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly tokens = input<UserToken[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<UserToken>();
  public readonly extend = output<UserToken>();
  public readonly revoke = output<UserToken>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('actionsMenu')
  private actionsMenu!: Menu;

  public actions: MenuItem[] = [];

  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent): void {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public statusLabel(token: UserToken): TokenStatus {
    if (token.revoked) {
      return 'Revocado';
    }

    if (token.consumed) {
      return 'Consumido';
    }

    if (this.isExpired(token)) {
      return 'Expirado';
    }

    return 'Vigente';
  }

  public statusSeverity(token: UserToken): TokenSeverity {
    const status = this.statusLabel(token);

    if (status === 'Vigente') {
      return 'success';
    }

    if (status === 'Consumido') {
      return 'warn';
    }

    return 'danger';
  }

  public openActionsMenu(
    event: Event,
    token: UserToken
  ): void {
    const modifiable =
      this.editable() &&
      !token.revoked &&
      !token.consumed;

    this.actions = [
      {
        label: 'Ver detalles',
        icon: 'pi pi-eye',
        command: () => this.show.emit(token)
      },
      {
        label: 'Extender expiración',
        icon: 'pi pi-calendar-plus',
        disabled: !modifiable,
        command: () => this.extend.emit(token)
      },
      {
        separator: true
      },
      {
        label: 'Revocar',
        icon: 'pi pi-ban',
        disabled: !modifiable,
        command: menuEvent => {
          this.confirmRevoke(
            menuEvent.originalEvent as Event,
            token
          );
        }
      }
    ];

    this.actionsMenu.toggle(event);
  }

  private isExpired(token: UserToken): boolean {
    return new Date(token.expirationDate).getTime() <= Date.now();
  }

  private confirmRevoke(
    event: Event,
    token: UserToken
  ): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `¿Quieres revocar el token “${token.name || token.scope}”? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Revocar',
        severity: 'danger'
      },
      accept: () => this.revoke.emit(token)
    });
  }

}