import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { AccessUserInfoDetailsComponent } from '../access-user-info-details/access-user-info-details.component';
import { AccessUserMemberEditorComponent } from '../access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../access-user-roles-editor/access-user-roles-editor.component';
import { AccessUserStatusComponent } from '../access-user-status/access-user-status.component';

@Component({
    selector: 'access-user-info',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule, AccessUserMemberEditorComponent, AccessUserRolesEditorComponent, AccessUserInfoDetailsComponent, AccessUserStatusComponent, WaitingButtonComponent, ControlButtonsComponent],
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
