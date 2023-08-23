import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Direction } from '@app/core/api/models/direction';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserService } from '../../services/access-user.service';
import { PageInfo } from '@app/core/api/models/page-info';

@Component({
  selector: 'access-user-roles',
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent implements OnChanges {

  @Input() public userId = -1;

  @Output() public nameDirectionChange = new EventEmitter<Direction>();

  public roles: Role[] = [];

  public roleSelection: Role[] = [];

  public readingRoles = false;

  public readingSelection = false;

  public rolesPageInfo = new PageInfo();

  public roleSelectionPageInfo = new PageInfo();

  constructor(
    private service: AccessUserService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadRoles(0);
      this.loadRoleSelectionPage(0);
    }
  }

  public onChangeNameDirection(direction: Direction) {
    this.nameDirectionChange.emit(direction);
  }

  public onRemoveRole(data: Role): void {
    this.service.removeRole(this.userId, data.id).subscribe(p => this.loadRoles(0));
  }

  public onAddRole(data: Role): void {
    this.service.addRole(this.userId, data.id).subscribe(p => this.loadRoles(0));
  }

  public loadRoleSelectionPage(page: number) {
    this.readingSelection = true;
    this.service.getRoleSelection(page).subscribe({
      next: response => {
        this.roleSelection = response.content;
        this.roleSelectionPageInfo = response;
        this.readingSelection = false;
      },
      error: error => {
        this.readingSelection = false;
      }
    });
  }

  public loadRoles(page: number) {
    this.readingRoles = true;
    this.service.getRoles(this.userId, page).subscribe({
      next: response => {
        this.roles = response.content;
        this.rolesPageInfo = response;
        this.rolesPageInfo.page = this.rolesPageInfo.page + 1;
        this.readingRoles = false;
      },
      error: error => {
        this.readingRoles = false;
      }
    });
  }

}
