import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ListPaginatedResponse } from '@app/core/api/models/list-paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { IconDeleteComponent } from '@bernardo-mg/icons';
import { BlockUiDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'access-user-roles',
    imports: [CommonModule, PaginationNavigationComponent, BlockUiDirective, IconDeleteComponent],
    templateUrl: './access-user-roles.component.html'
})
export class AccessUserRolesComponent implements OnChanges {

  @Input() public roles: Role[] = [];

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<Role>();

  public data = new ListPaginatedResponse<Role>([], 0, 0);

  private pageSize = 10;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles']) {
      this.data = this.buildPage(1);
    }
  }

  public onGoToPage(page: number) {
    this.data = this.buildPage(page);
  }

  public onRemove(role: Role): void {
    this.remove.emit(role);
  }

  private buildPage(page: number) {
    return new ListPaginatedResponse<Role>(this.roles, page, this.pageSize);
  }

}
