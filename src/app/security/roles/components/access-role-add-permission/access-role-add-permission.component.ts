
import { Component, input, output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse, SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-role-add-permission',
  imports: [SortingButtonComponent, PaginationNavigationComponent, IconAddComponent, JustifyCenterDirective],
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent {

  public readonly permissions = input(new PaginatedResponse<ResourcePermission>());

  public readonly addPermission = output<ResourcePermission>();

  public readonly goTo = output<number>();

  public readonly changeDirection = output<SortingProperty>();

  public data = new ResourcePermission();

  public onAddPermission(permission: ResourcePermission): void {
    this.addPermission.emit(permission);
  }

  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

  public onChangeDirection(field: SortingProperty) {
    this.changeDirection.emit(field);
  }

}
