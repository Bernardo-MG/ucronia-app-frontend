import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-role-add-permission',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingOverlayComponent, SortingButtonComponent, PaginationNavigationComponent],
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
