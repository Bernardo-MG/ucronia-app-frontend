import { Component, inject, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { User } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { UserStatusTag } from '../user-status-tag/user-status-tag';

@Component({
  selector: 'access-user-list',
  imports: [TableModule, ButtonModule, MenuModule, UserStatusTag],
  templateUrl: './user-list.html'
})
export class UserList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly readProfile = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly users = input<User[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<User>();
  public readonly delete = output<Event>();
  public readonly edit = output<User>();
  public readonly editRoles = output<User>();
  public readonly editMember = output<User>();
  public readonly active = output<boolean>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') private editionMenu!: Menu;

  public infoMenuItems: MenuItem[] = [];
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public openEditionMenu(event: Event, user: User) {
    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.edit.emit(user)
      });
    this.editionMenuItems.push(
      {
        label: 'Roles',
        command: () => this.editRoles.emit(user)
      });
    this.editionMenuItems.push(
      {
        label: 'Socio',
        command: () => this.editMember.emit(user)
      });
    // Active/Deactivate toggle
    const isActive = user.enabled;
    this.editionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: (method) => this.onConfirmSetActive(method.originalEvent as Event, !isActive)
    });

    this.editionMenu.toggle(event);
  }

  private onConfirmSetActive(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar el usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar el usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
        this.active.emit(status);
      }
    });
  }

}
