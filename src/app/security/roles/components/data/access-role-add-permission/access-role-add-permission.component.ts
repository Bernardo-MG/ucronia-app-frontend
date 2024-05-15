import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { AccessRoleService } from '../../../services/access-role.service';

@Component({
  selector: 'access-role-add-permission',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public role = "";

  @Output() public addPermission = new EventEmitter<ResourcePermission>();

  public page = new PaginatedResponse<ResourcePermission[]>([]);

  public readingPermissions = false;

  public data = new ResourcePermission();

  private sort = new Sort([]);

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.load(0);
    }
  }

  public onAddPermission(permission: ResourcePermission): void {
    this.addPermission.emit(permission);
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
    this.readingPermissions = true;
    if (this.role) {
      this.service.getAvailablePermissions(this.role, page, this.sort).subscribe({
        next: response => {
          this.page = response;

          // Reactivate view
          this.readingPermissions = false;
        },
        error: error => {
          // Reactivate view
          this.readingPermissions = false;
        }
      });
    }
  }

}
