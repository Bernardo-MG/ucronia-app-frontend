import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer, User } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserSelectionListComponent } from '../access-user-selection-list/access-user-selection-list.component';

@Component({
    selector: 'access-user-selection-list-widget',
    imports: [RouterModule, AccessUserSelectionListComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
    templateUrl: './access-user-selection-list-widget.component.html'
})
export class AccessUserSelectionListWidgetComponent implements OnInit {

  public createPermission = false;

  public data = new PaginatedResponse<User>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor(
    private authContainer: AuthContainer,
    private service: AccessUserService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("user", "create");

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

  public routeLinkAdapter(data: User): string {
    return `/security/users/${data.username}`;
  }

}
