import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
    selector: 'access-role-add-permission',
    imports: [CommonModule, IconsModule, SortingButtonComponent, PaginationNavigationComponent, JustifyCenterDirective],
    templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public permissions = new PaginatedResponse<ResourcePermission[]>([]);

  @Output() public addPermission = new EventEmitter<ResourcePermission>();

  @Output() public goTo = new EventEmitter<number>();

  @Output() public changeDirection = new EventEmitter<SortProperty>();

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

  public onChangeDirection(field: SortProperty) {
    this.changeDirection.emit(field);
  }

}
