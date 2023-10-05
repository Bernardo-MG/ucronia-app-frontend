import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Permission } from '@app/core/authentication/models/permission';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-selection-list',
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent  implements OnInit {

  @Output() public changeDirection = new EventEmitter<Sort<Permission>>();

  /**
   * Loading flag.
   */
  public readingRoles = false;

  public roles: Role[] = [];

  public totalPages = 0;

  constructor(
    private service: AccessRoleService
  ) {}

  ngOnInit(): void {
    this.load(undefined);
  }

  public onChangeDirection(sort: Sort<Permission>) {
    this.changeDirection.emit(sort);
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingRoles = true;
    this.service.getAll(pagination).subscribe({
      next: page => {

        this.roles = page.content;

        this.totalPages = page.totalPages;
        // Reactivate view
        this.readingRoles = false;
      },
      error: error => {
        // Reactivate view
        this.readingRoles = false;
      }
    });
  }

}
