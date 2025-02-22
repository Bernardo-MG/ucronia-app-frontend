import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, SortingProperty } from '@bernardo-mg/request';

@Component({
    selector: 'access-role-add-permission',
    imports: [CommonModule, SortingButtonComponent, PaginationNavigationComponent, IconAddComponent, JustifyCenterDirective],
    templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public permissions = new PaginatedResponse<ResourcePermission[]>([]);

  @Output() public addPermission = new EventEmitter<ResourcePermission>();

  @Output() public goTo = new EventEmitter<number>();

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

  public data = new ResourcePermission();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.goTo.emit(0);
    }
  }

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
