import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleSelectionListComponent } from '../access-role-selection-list/access-role-selection-list.component';

@Component({
  selector: 'access-role-selection-list-widget',
  standalone: true,
  imports: [RouterModule, IconsModule, AccessRoleSelectionListComponent, PaginationNavigationComponent],
  templateUrl: './access-role-selection-list-widget.component.html'
})
export class AccessRoleSelectionListWidgetComponent implements OnInit {

  public createPermission = false;

  public page = new PaginatedResponse<Role[]>([]);

  /**
   * Loading flag.
   */
  public readingRoles = false;

  private sort = new Sort([]);

  constructor(
    private authContainer: AuthContainer,
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("role", "create");

    this.load(0);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
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
