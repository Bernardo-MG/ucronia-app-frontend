import { Component, inject, input, output, ViewChild } from '@angular/core';
import { User } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'access-user-list',
  imports: [TableModule, ButtonModule, MenuModule],
  templateUrl: './user-list.html'
})
export class UserList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly readContact = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly users = input<User[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<User>();
  public readonly showRoles = output<User>();
  public readonly delete = output<string>();
  public readonly edit = output<{ view: string, user: User }>();
  public readonly active = output<boolean>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  @ViewChild('infoMenu') private infoMenu!: Menu;
  @ViewChild('editionMenu') private editionMenu!: Menu;

  public infoMenuItems: MenuItem[] = [];
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onDelete(event: Event, username: string) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
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
      accept: () => this.delete.emit(username)
    });
  }

  public openInfoMenu(event: Event, user: User) {
    this.infoMenuItems = [];

    // Load info menu
    this.infoMenuItems.push(
      {
        label: 'Datos',
        command: () => this.show.emit(user)
      },
      {
        label: 'Roles',
        command: () => this.showRoles.emit(user)
      }
    );

    this.infoMenu.toggle(event);
  }

  public openEditionMenu(event: Event, user: User) {
    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.edit.emit({ view: 'edition', user })
      });
    this.editionMenuItems.push(
      {
        label: 'Roles',
        command: () => this.edit.emit({ view: 'roles', user })
      });
    this.editionMenuItems.push(
      {
        label: 'Socio',
        command: () => this.edit.emit({ view: 'member', user })
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
