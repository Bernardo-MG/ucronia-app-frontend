import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';
import { PaginationRequest } from '@app/core/api/models/pagination-request';

@Component({
  selector: 'access-user-roles',
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent implements OnChanges {

  @Input() public userId = -1;

  @Input() public editable = false;

  @Input() public deletable = false;

  public roles: Role[] = [];

  public readingRoles = false;

  public rolesPage = 0;

  public rolesTotalPages = 0;

  private sort: Sort<Role> | undefined = undefined;

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadRoles(0);
    }
  }

  public onChangeNameDirection(sort: Sort<Role>) {
    this.sort = sort;
    this.loadRoles(0);
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.userId, data.id).subscribe(p => this.loadRoles(0));
  }

  public loadRoles(page: number) {
    this.readingRoles = true;

    const request = new PaginationRequest();
    request.page = page;
    if (this.sort) {
      request.sort = [this.sort];
    }
    this.service.getRoles(this.userId, request).subscribe({
      next: response => {
        this.roles = response.content;
        this.rolesPage = response.page + 1;
        this.rolesTotalPages = response.totalPages;
        this.readingRoles = false;
      },
      error: error => {
        this.readingRoles = false;
      }
    });
  }

}
