
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { IconDeleteComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { ArrayPaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'access-role-permissions',
  imports: [PaginationNavigationComponent, JustifyCenterDirective, IconDeleteComponent, BlockUiDirective],
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent {

  private _permissions: ResourcePermission[] = [];

  @Input() public set permissions(data: ResourcePermission[]) {
    this._permissions = data;
    this.data = this.buildPage(1);
  }

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<ResourcePermission>();

  public data = new ArrayPaginatedResponse<ResourcePermission>([], 0, 0);

  private pageSize = 10;

  public onGoToPage(page: number) {
    this.data = this.buildPage(page);
  }

  public onRemove(permission: ResourcePermission): void {
    this.remove.emit(permission);
  }

  private buildPage(page: number) {
    return new ArrayPaginatedResponse<ResourcePermission>(this._permissions, page, this.pageSize);
  }

}
