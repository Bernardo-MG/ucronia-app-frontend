import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ListPaginatedResponse } from '@app/core/api/models/list-paginated-response';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'access-role-permissions',
  standalone: true,
  imports: [CommonModule, IconsModule, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent implements OnChanges {

  @Input() public permissions: ResourcePermission[] = [];

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<ResourcePermission>();

  public data = new ListPaginatedResponse<ResourcePermission>([], 0, 0);

  private pageSize = 10;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['permissions']) {
      this.data = this.buildPage(0);
    }
  }

  public onGoToPage(page: number) {
    this.data = this.buildPage(page - 1);
  }

  public onRemove(permission: ResourcePermission): void {
    this.remove.emit(permission);
  }

  private buildPage(page: number) {
    return new ListPaginatedResponse<ResourcePermission>(this.permissions, page, this.pageSize);
  }

}
