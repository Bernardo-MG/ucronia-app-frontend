import { Component, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { User } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UserStatusTag } from '../user-status-tag/user-status-tag';

export interface UserStatusChange {
  user: User;
  enabled: boolean;
}

export interface UserDeleteEvent {
  event: Event;
  user: User;
}

@Component({
  selector: 'access-user-list',
  imports: [
    TableModule,
    ButtonModule,
    MenuModule,
    TagModule,
    UserStatusTag
  ],
  templateUrl: './user-list.html'
})
export class UserList {

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly users = input<User[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<User>();
  public readonly edit = output<User>();
  public readonly active = output<UserStatusChange>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu')
  private editionMenu!: Menu;

  public editionMenuItems: MenuItem[] = [];

  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent): void {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public openEditionMenu(event: Event, user: User): void {
    this.editionMenuItems = [
      {
        label: 'Ver detalles',
        icon: 'pi pi-eye',
        command: () => this.show.emit(user)
      },
      {
        label: 'Editar datos',
        icon: 'pi pi-pencil',
        disabled: !this.editable(),
        command: () => this.edit.emit(user)
      },
      {
        separator: true
      },
      {
        label: user.enabled ? 'Desactivar' : 'Activar',
        icon: user.enabled
          ? 'pi pi-ban'
          : 'pi pi-check-circle',
        disabled: !this.editable(),
        command: () => {
          this.active.emit({
            user,
            enabled: !user.enabled
          });
        }
      }
    ];

    this.editionMenu.toggle(event);
  }
}