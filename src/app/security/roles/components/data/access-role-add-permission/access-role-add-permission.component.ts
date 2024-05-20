import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-role-add-permission',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public permissions = new PaginatedResponse<ResourcePermission[]>([]);

  @Output() public addPermission = new EventEmitter<ResourcePermission>();

  @Output() public goTo = new EventEmitter<number>();

  @Output() public changeDirection = new EventEmitter<SortField>();

  public data = new ResourcePermission();

  private sort = new Sort([]);

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

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);
  }

}
