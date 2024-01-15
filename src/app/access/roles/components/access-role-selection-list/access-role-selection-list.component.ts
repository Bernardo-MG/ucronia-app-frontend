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

  /**
   * Loading flag.
   */
  public readingRoles = false;

  public roles: Role[] = [];

  public totalPages = 0;

  public currentPage = 0;

  private sort: Sort[] = [];

  constructor(
    private service: AccessRoleService
  ) {}

  ngOnInit(): void {
    this.load(undefined);
  }

  public onChangeDirection(sort: Sort) {
    const index = this.sort.findIndex(s => s.property === sort.property);
    if (index < 0) {
      // New property to sort
      this.sort.push(sort);
    } else {
      // Replace property
      this.sort[index] = sort;
    }
    this.load({ page: this.currentPage, sort: this.sort });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingRoles = true;
    this.service.getAll(pagination).subscribe({
      next: page => {

        this.roles = page.content;

        this.currentPage = page.page;
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
