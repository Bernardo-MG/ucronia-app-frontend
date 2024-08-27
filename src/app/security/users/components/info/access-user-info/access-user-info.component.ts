import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/shared/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { AccessUserMemberEditorComponent } from '../../form/access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../../form/access-user-roles-editor/access-user-roles-editor.component';
import { AccessUserInfoDetailsComponent } from '../access-user-info-details/access-user-info-details.component';
import { AccessUserStatusComponent } from '../access-user-status/access-user-status.component';

@Component({
  selector: 'access-user-info',
  standalone: true,
  imports: [CommonModule, FormModule, AccessUserMemberEditorComponent, AccessUserRolesEditorComponent, AccessUserInfoDetailsComponent, AccessUserStatusComponent, WaitingButtonComponent],
  templateUrl: './access-user-info.component.html'
})
export class AccessUserInfoComponent {

  @Input() public data = new User();

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public member = new Member();

  @Input() public readingMemberSelection = false;

  @Input() public readingMember = false;

  @Input() public membersSelection = new PaginatedResponse<Member[]>([]);

  @Input() public readingRoleSelection = false;

  @Input() public rolesSelection = new PaginatedResponse<Role[]>([]);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public addRole = new EventEmitter<Role>();

  @Output() public removeRole = new EventEmitter<Role>();

  @Output() public selectMember = new EventEmitter<Member>();

  @Output() public goToRoleSelectionPage = new EventEmitter<number>();

  @Output() public goToMemberSelectionPage = new EventEmitter<number>();

  public view: 'user' | 'roles' | 'member' | 'status' = 'user';

  public onChangeView(newView: 'user' | 'roles' | 'member' | 'status') {
    this.view = newView;
  }

}
