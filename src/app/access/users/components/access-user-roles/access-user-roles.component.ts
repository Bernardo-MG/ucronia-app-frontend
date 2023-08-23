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

  public waitingRoles = false;

  public rolesPageInfo = new PageInfo();

  public roleSelection: Role[] = [];

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
    this.service.getRoleSelection(page).subscribe(response => {
      this.roleSelection = response.content;
      this.roleSelectionPageInfo = response;
    });
  }

  public loadRoles(page: number) {
    this.waitingRoles = true;
    this.service.getRoles(this.userId, page).subscribe(response => {
      this.roles = response.content;
      this.rolesPageInfo = response;
      this.rolesPageInfo.page = this.rolesPageInfo.page + 1;
      this.waitingRoles = false;
    });
  }

}
