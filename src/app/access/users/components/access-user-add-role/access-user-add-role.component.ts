import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-add-role',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, PaginationNavigationComponent],
  templateUrl: './access-user-add-role.component.html'
})
export class AccessUserAddRoleComponent implements OnChanges {

  @Input() public user = "";

  @Input() public page = new PaginatedResponse<Role[]>([]);

  @Output() public addRole = new EventEmitter<Role>();

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
    this.addRole.emit(data);
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
