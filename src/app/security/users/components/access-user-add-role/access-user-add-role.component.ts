
import { Component, input, output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-add-role',
  imports: [PaginationNavigationComponent, JustifyCenterDirective, IconAddComponent, BlockUiDirective],
  templateUrl: './access-user-add-role.component.html'
})
export class AccessUserAddRoleComponent {

  public readonly roles = input(new PaginatedResponse<Role>());

  public readonly waiting = input(false);

  public readonly addRole = output<Role>();

  public readonly goToPage = output<number>();

  constructor() {
    this.onGoToPage(0);
  }

  public onAdd(data: Role): void {
    this.addRole.emit(data);
  }

  public onGoToPage(page: number): void {
    this.goToPage.emit(page);
  }

}
