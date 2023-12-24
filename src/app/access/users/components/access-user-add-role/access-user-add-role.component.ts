import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-add-role',
  templateUrl: './access-user-add-role.component.html'
})
export class AccessUserAddRoleComponent implements OnChanges {

  @Input() public userId = -1;

  @Output() public addRole = new EventEmitter<Role>();

  public roleSelection: Role[] = [];

  public readingSelection = false;

  public roleSelectionPage = 0;

  public roleSelectionTotalPages = 0;

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadRoleSelectionPage(0);
    }
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.userId, data.name).subscribe(p => {
      this.addRole.emit(data);
    });
  }

  public loadRoleSelectionPage(page: number) {
    this.readingSelection = true;
    this.service.getAvailableRoles(this.userId, { page }).subscribe({
      next: response => {
        this.roleSelection = response.content;
        this.roleSelectionPage = response.page + 1;
        this.roleSelectionTotalPages = response.totalPages;
        this.readingSelection = false;
      },
      error: error => {
        this.readingSelection = false;
      }
    });
  }

}
