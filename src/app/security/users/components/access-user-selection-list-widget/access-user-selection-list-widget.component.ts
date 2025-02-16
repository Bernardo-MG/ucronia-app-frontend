import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserSelectionListComponent } from '../access-user-selection-list/access-user-selection-list.component';

@Component({
    selector: 'access-user-selection-list-widget',
    imports: [RouterModule, AccessUserSelectionListComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
    templateUrl: './access-user-selection-list-widget.component.html'
})
export class AccessUserSelectionListWidgetComponent implements OnInit {

  public createPermission = false;

  public data = new PaginatedResponse<User[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

  constructor(
    private authContainer: AuthContainer,
    private service: AccessUserService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("user", "create");

    this.load(0);
  }

  public onChangeDirection(field: SortProperty) {
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

  public routeLinkAdapter(data: User): string {
    return `/security/users/${data.username}`;
  }

}
