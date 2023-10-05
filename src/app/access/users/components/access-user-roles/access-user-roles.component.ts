import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Direction } from '@app/core/api/models/direction';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-roles',
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent implements OnChanges {

  @Input() public userId = -1;

  @Input() public editable = false;

  @Input() public deletable = false;

  public view = 'list';

  public roles: Role[] = [];

  public roleSelection: Role[] = [];

  public readingRoles = false;

  public readingSelection = false;

  public rolesPage = 0;

  public rolesTotalPages = 0;

  public roleSelectionPage = 0;

  public roleSelectionTotalPages = 0;

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadRoles(0);
      this.loadRoleSelectionPage(0);
    }
  }

  public onChangeNameDirection(sort: Sort<any>) {
    this.loadRoleSelectionPage(0);
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.userId, data.id).subscribe(p => this.loadRoles(0));
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.userId, data.id).subscribe(p => {
      this.loadRoles(0);
      this.view = "list";
    });
  }

  public onShowAddRole() {
    this.view = "add";
  }

  public loadRoleSelectionPage(page: number) {
    this.readingSelection = true;
    this.service.getAvailableRoles(this.userId, page).subscribe({
      next: response => {
        this.roleSelection = response.content;
        this.roleSelectionPage = response.page + 1;
        this.roleSelectionTotalPages = response.totalPages;
        this.readingSelection = false;
      },
      error: error => {
        this.readingSelection = false;
      }
    });
  }

  public loadRoles(page: number) {
    this.readingRoles = true;
    this.service.getRoles(this.userId, page).subscribe({
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
