import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ListPaginatedResponse } from '@app/core/api/models/list-paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-user-roles',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRolesComponent implements OnChanges {

  @Input() public roles: Role[] = [];

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<Role>();

  public page = new ListPaginatedResponse<Role>([], 0, 0);

  private pageSize = 10;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles']) {
      this.page = this.buildPage(0);
    }
  }

  public onGoToPage(page: number) {
    this.page = this.buildPage(page - 1);
  }

  public onRemove(role: Role): void {
    this.remove.emit(role);
  }

  private buildPage(page: number) {
    return new ListPaginatedResponse<Role>(this.roles, page, this.pageSize);
  }

}
