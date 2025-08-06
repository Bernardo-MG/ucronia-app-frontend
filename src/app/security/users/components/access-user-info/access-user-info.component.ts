import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Member } from '@app/models/members/member';
import { Role, User } from '@bernardo-mg/authentication';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { WaitingDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { AccessUserMemberEditorComponent } from '../access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../access-user-roles-editor/access-user-roles-editor.component';
import { AccessUserStatusComponent } from '../access-user-status/access-user-status.component';

@Component({
  selector: 'access-user-info',
  imports: [CommonModule, CardModule, FormsModule, ReactiveFormsModule, SkeletonModule, AccessUserMemberEditorComponent, AccessUserRolesEditorComponent, AccessUserStatusComponent, ControlButtonsComponent, WaitingDirective],
  templateUrl: './access-user-info.component.html'
})
export class AccessUserInfoComponent {

  public readonly data = input(new User());

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  public readonly editEnabled = input(false);

  public readonly loading = input(false);

  public readonly member = input(new Member());

  public readonly readingMemberSelection = input(false);

  public readonly readingMember = input(false);

  public readonly membersSelection = input(new PaginatedResponse<Member>());

  public readonly readingRoleSelection = input(false);

  public readonly rolesSelection = input(new PaginatedResponse<Role>());

  public readonly delete = output<void>();

  public readonly startEditing = output<void>();

  public readonly addRole = output<Role>();

  public readonly removeRole = output<Role>();

  public readonly selectMember = output<Member>();

  public readonly goToRoleSelectionPage = output<number>();

  public readonly goToMemberSelectionPage = output<number>();

  public view: 'user' | 'roles' | 'member' | 'status' = 'user';

  public onChangeView(newView: 'user' | 'roles' | 'member' | 'status') {
    this.view = newView;
  }

}
