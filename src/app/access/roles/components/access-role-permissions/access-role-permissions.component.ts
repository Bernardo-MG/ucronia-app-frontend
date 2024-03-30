import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { Permission } from '@app/core/authentication/models/permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { PaginationOrderButtonComponent } from '@app/shared/pagination/components/pagination-order-button/pagination-order-button.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-permissions',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, PaginationOrderButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent implements OnChanges {

  @Input() public role = "";

  @Input() public deletable = false;

  public page = new PaginatedResponse<Permission[]>([]);

  public reading = false;

  private sort = new Sort([]);

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['role']) && (this.role.length)) {
      this.load(0);
    }
  }

  public onRemove(permission: Permission): void {
    this.service.removePermission(this.role, permission.name).subscribe(p => this.load(0));
  }

  public onGoTo(page: number) {
    this.load(page);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  private load(page: number) {
    this.reading = true;
    this.service.getPermissions(this.role, page, this.sort).subscribe({
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

}
