import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-roles',
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent implements OnChanges {

  @Input() public user = "";

  @Input() public editable = false;

  @Input() public deletable = false;

  public response = new PaginatedResponse<Role[]>([]);

  public readingRoles = false;

  private sort = new Sort([]);

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['user']) && (this.user.length)) {
      this.load(0);
    }
  }

  public onGoTo(page: number) {
    this.load(page);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    this.load(this.response.currentPage);
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.user, data.name).subscribe(p => this.load(0));
  }

  private load(page: number) {
    this.readingRoles = true;
    this.service.getRoles(this.user, page, this.sort).subscribe({
      next: response => {
        this.response = response;

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
