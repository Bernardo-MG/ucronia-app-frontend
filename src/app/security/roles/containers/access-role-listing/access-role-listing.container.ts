import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Role } from '../../../../../../projects/bernardo-mg/authentication/src/lib/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { AccessRoleSelectionListComponent } from '../../components/access-role-selection-list/access-role-selection-list.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
    selector: 'access-role-listing',
    imports: [RouterModule, AccessRoleSelectionListComponent, PaginationInfoComponent, IconAddComponent, ArticleComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
    templateUrl: './access-role-listing.container.html'
})
export class AccessRoleListingContainer implements OnInit {

  public createPermission = false;

  public data = new PaginatedResponse<Role>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor(
    private authContainer: AuthContainer,
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("role", "create");

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
