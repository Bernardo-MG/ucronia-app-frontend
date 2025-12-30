import { DatePipe } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { UserToken } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'access-user-token-list',
  imports: [TableModule, ButtonModule, MenuModule, DatePipe],
  templateUrl: './user-token-list.html'
})
export class UserTokenList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly readProfile = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly tokens = input<UserToken[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<UserToken>();
  public readonly extend = output<UserToken>();
  public readonly revoke = output<UserToken>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') private editionMenu!: Menu;

  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public openEditionMenu(event: Event, token: UserToken) {
    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Extender expiración',
        command: () => this.extend.emit(token)
      }
    );
    if (!token.revoked) {
      this.editionMenuItems.push(
        {
          label: 'Revocar',
          command: (method) => this.onConfirmRevoke(method.originalEvent as Event, token)
        }
      );
    }

    this.editionMenu.toggle(event);
  }

  private onConfirmRevoke(event: Event, token: UserToken) {
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
      accept: () => this.revoke.emit(token)
    });
  }

}
