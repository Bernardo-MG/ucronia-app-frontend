import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';
import { Sort } from '@app/core/api/models/sort';

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

  private sort = new Sort([]);

  constructor(
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

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
