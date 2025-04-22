import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer, Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/ui';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { AccessRoleSelectionListComponent } from '../../components/access-role-selection-list/access-role-selection-list.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-listing',
  imports: [RouterModule, AccessRoleSelectionListComponent, PaginationInfoComponent, IconAddComponent, ArticleComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
  templateUrl: './access-role-listing.container.html'
})
export class AccessRoleListingContainer {

  private readonly service = inject(AccessRoleService);

  public readonly createPermission;

  public data = new PaginatedResponse<Role>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor(
    authContainer: AuthContainer
  ) {
    // Check permissions
    this.createPermission = authContainer.hasPermission("role", "create");

    this.load(0);
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public load(page: number) {
    this.reading = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.reading = false;
      },
      error: error => {
        // Reactivate view
        this.reading = false;
      }
    });
  }

  public routeLinkAdapter(data: Role): string {
    return `/security/roles/${data.name}`;
  }

}
