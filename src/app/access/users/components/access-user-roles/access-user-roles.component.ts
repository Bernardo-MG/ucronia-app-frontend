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

  @Input() public user = "";

  @Input() public editable = false;

  @Input() public deletable = false;

  public roles: Role[] = [];

  public readingRoles = false;

  public currentPage = 0;

  public totalPages = 0;

  private sort: Sort<Role>[] = [];

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['user']) && (this.user.length)) {
      this.load(undefined);
    }
  }

  public onGoTo(page: number) {
    this.load({ page, sort: this.sort });
  }

  public onChangeDirection(sort: Sort<Role>) {
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

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.user, data.name).subscribe(p => this.load(undefined));
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingRoles = true;
    this.service.getRoles(this.user, pagination).subscribe({
      next: response => {
        this.roles = response.content;
        this.currentPage = response.page + 1;
        this.totalPages = response.totalPages;
        this.readingRoles = false;
      },
      error: error => {
        this.readingRoles = false;
      }
    });
  }

}
