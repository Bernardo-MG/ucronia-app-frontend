import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AccessUserSelectionListComponent } from '../access-user-selection-list/access-user-selection-list.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-selection-list-widget',
  standalone: true,
  imports: [IconsModule, AccessUserSelectionListComponent],
  templateUrl: './access-user-selection-list-widget.component.html'
})
export class AccessUserSelectionListWidgetComponent implements OnInit {

  public createPermission = false;

  public page = new PaginatedResponse<User[]>([]);

  /**
   * Loading flag.
   */
  public readingUsers = false;

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

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  private load(page: number) {
    this.readingUsers = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingUsers = false;
      },
      error: error => {
        // Reactivate view
        this.readingUsers = false;
      }
    });
  }

}
