import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { IconDeleteComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/layout';
import { ArrayPaginatedResponse } from '@bernardo-mg/request';

@Component({
    selector: 'access-role-permissions',
    imports: [CommonModule, PaginationNavigationComponent, JustifyCenterDirective, IconDeleteComponent, BlockUiDirective],
    templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent implements OnChanges {

  @Input() public permissions: ResourcePermission[] = [];

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<ResourcePermission>();

  public data = new ArrayPaginatedResponse<ResourcePermission>([], 0, 0);

  private pageSize = 10;

  ngOnChanges({ permissions }: SimpleChanges): void {
    if (permissions) {
      this.data = this.buildPage(1);
    }
  }

  public onGoToPage(page: number) {
    this.data = this.buildPage(page);
  }

  public onRemove(permission: ResourcePermission): void {
    this.remove.emit(permission);
  }

  private buildPage(page: number) {
    return new ArrayPaginatedResponse<ResourcePermission>(this.permissions, page, this.pageSize);
  }

}
