import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-selection-list',
  standalone: true,
  imports: [CommonModule, LayoutModule, PaginationModule, RouterModule],
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent implements OnInit {

  public page = new PaginatedResponse<Role[]>([]);

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

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  private load(page: number) {
    this.readingRoles = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

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
