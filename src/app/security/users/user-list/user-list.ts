import { Component, input, output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { User } from '@bernardo-mg/authentication';
import { MenuItem } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { Menu, MenuModule } from '@openng/optimus-ui/menu';
import { TableModule, TablePageEvent } from '@openng/optimus-ui/table';
import { TagModule } from '@openng/optimus-ui/tag';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './user-list.html'
})
export class UserList {

  public readonly editable = input(false);
  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);
  public readonly users = input<User[]>([]);

  public readonly active = output<UserStatusChange>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();
  public readonly show = output<User>();

  public editionMenuItems: MenuItem[] = [];
  public get first(): number {
    return (this.page() - 1) * this.rows();
  }

  @ViewChild('editionMenu')
  private readonly editionMenu!: Menu;

  // Event handlers
  public onPageChange(event: TablePageEvent): void {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public openEditionMenu(event: Event, user: User): void {
    this.editionMenuItems = [
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