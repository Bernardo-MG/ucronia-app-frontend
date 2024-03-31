import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/sorting-button/sorting-button.component';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-roles',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent {

  @Input() public roles: Role[] = [];

  @Input() public editable = false;

  @Input() public deletable = false;

  @Output() public remove = new EventEmitter<Role>();

  public readingRoles = false;

  constructor() { }

  public onRemove(role: Role): void {
    this.remove.emit(role);
  }

}
