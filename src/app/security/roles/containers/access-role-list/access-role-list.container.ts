import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer, Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-list',
  imports: [RouterModule, CardModule, TableModule, IconAddComponent],
  templateUrl: './access-role-list.container.html'
})
export class AccessRoleListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(AccessRoleService);

  public readonly createPermission;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Role>();

  public selectedData = new Role();

  /**
   * Loading flag.
   */
  public loading = false;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("role", "create");

    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectRow() {
    this.router.navigate([`/security/roles/${this.selectedData.name}`]);
  }

  public load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
