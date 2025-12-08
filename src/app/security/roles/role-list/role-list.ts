import { Component, inject, input, output, ViewChild } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'access-role-list',
  imports: [TableModule, ButtonModule, MenuModule],
  templateUrl: './role-list.html'
})
export class RoleList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly readContact = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly roles = input<Role[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Role>();
  public readonly delete = output<Role>();
  public readonly edit = output<{ view: string, role: Role }>();
  public readonly changePermissions = output<Role>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  @ViewChild('infoMenu') private infoMenu!: Menu;
  @ViewChild('editionMenu') private editionMenu!: Menu;

  public infoMenuItems: MenuItem[] = [];
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  constructor() {
  }

  public onDelete(event: Event, role: Role) {
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
      accept: () => this.delete.emit(role)
    });
  }

  public onShowInfo(role: Role) {
    this.show.emit(role)
  }

  public openEditionMenu(event: Event, role: Role) {
    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Cambiar permisos',
        command: () => this.changePermissions.emit(role)
      });
    this.editionMenu.toggle(event);
  }

}
