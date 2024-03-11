import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';

@Component({
  selector: 'access-user-add-role',
  templateUrl: './access-user-add-role.component.html'
})
export class AccessUserAddRoleComponent implements OnChanges {

  @Input() public user = "";

  @Output() public addRole = new EventEmitter<Role>();

  public page = new PaginatedResponse<Role[]>([]);

  public readingSelection = false;

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['user']) && (this.user.length)) {
      this.loadRoleSelectionPage(0);
    }
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.user, data.name).subscribe(p => {
      this.addRole.emit(data);
    });
  }

  public loadRoleSelectionPage(page: number) {
    this.readingSelection = true;
    this.service.getAvailableRoles(this.user, page).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingSelection = false;
      },
      error: error => {
        // Reactivate view
        this.readingSelection = false;
      }
    });
  }

}
