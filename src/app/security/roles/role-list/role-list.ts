import { Component, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Role } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';

export interface RoleDeleteEvent {
  event: Event;
  role: Role;
}

@Component({
  selector: 'access-role-list',
  imports: [TableModule, ButtonModule, MenuModule],
  templateUrl: './role-list.html'
})
export class RoleList {

  public readonly loading = input(false);
  public readonly roles = input<Role[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Role>();
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

  public openActionsMenu(event: Event, role: Role): void {
    this.actions = [
      {
        label: 'Ver detalles',
        icon: 'pi pi-eye',
        command: () => this.show.emit(role)
      }
    ];

    this.actionsMenu.toggle(event);
  }

}