import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-selection-list',
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent implements OnInit {

  public response = new PaginatedResponse<Role[]>([]);

  /**
   * Loading flag.
   */
  public readingRoles = false;

  private sort: Sort[] = [];

  constructor(
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    this.load(0);
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
    this.load(this.response.currentPage);
  }

  private load(page: number) {
    this.readingRoles = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.response = response;

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
