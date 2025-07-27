import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer, User } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { AccessUserSelectionListComponent } from '../../components/access-user-selection-list/access-user-selection-list.component';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-selection-list-widget',
  imports: [CommonModule, CardModule, RouterModule, AccessUserSelectionListComponent, PaginationInfoComponent, IconAddComponent],
  templateUrl: './access-user-selection-list-widget.container.html'
})
export class AccessUserSelectionListWidgetContainer {

  private readonly service = inject(AccessUserService);

  public readonly createPermission;

  public data = new PaginatedResponse<User>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("user", "create");

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
