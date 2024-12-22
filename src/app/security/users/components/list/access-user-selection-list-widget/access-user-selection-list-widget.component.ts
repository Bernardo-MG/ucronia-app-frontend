import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationInfoComponent } from '@app/shared/layout/components/pagination-info/pagination-info.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { AccessUserService } from '../../../services/access-user.service';
import { AccessUserSelectionListComponent } from '../access-user-selection-list/access-user-selection-list.component';

@Component({
  selector: 'access-user-selection-list-widget',
  standalone: true,
  imports: [CardModule, RouterModule, IconsModule, AccessUserSelectionListComponent, PaginationInfoComponent, JustifyCenterDirective],
  templateUrl: './access-user-selection-list-widget.component.html'
})
export class AccessUserSelectionListWidgetComponent implements OnInit {

  public createPermission = false;

  public page = new PaginatedResponse<User[]>([]);

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

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
    this.reading = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

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
