import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse, SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-role-add-permission',
  imports: [CommonModule, SortingButtonComponent, PaginationNavigationComponent, IconAddComponent, JustifyCenterDirective],
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent {

  @Input() public permissions = new PaginatedResponse<ResourcePermission>();

  @Output() public addPermission = new EventEmitter<ResourcePermission>();

  @Output() public goTo = new EventEmitter<number>();

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

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
