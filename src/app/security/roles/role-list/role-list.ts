import { Component, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Role } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-role-list',
  imports: [TableModule, ButtonModule, MenuModule],
  templateUrl: './role-list.html'
})
export class RoleList {

  public readonly loading = input(false);
  public readonly readProfile = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly roles = input<Role[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Role>();
  public readonly delete = output<Event>();
  public readonly edit = output<{ view: string, role: Role }>();
  public readonly changePermissions = output<Role>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('infoMenu') private infoMenu!: Menu;
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
