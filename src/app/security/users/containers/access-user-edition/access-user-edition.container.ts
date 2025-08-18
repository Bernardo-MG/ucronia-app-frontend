
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/domain/members/member';
import { AuthContainer, Role, User } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ModalComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { AccessUserFormComponent } from '../../components/access-user-form/access-user-form.component';
import { AccessUserMemberEditorComponent } from '../../components/access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../../components/access-user-roles-editor/access-user-roles-editor.component';
import { UserUpdate } from '../../models/user-update';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-edition',
  imports: [CommonModule, CardModule, SkeletonModule, ButtonModule, AccessUserFormComponent, ModalComponent, AccessUserRolesEditorComponent, AccessUserMemberEditorComponent, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './access-user-edition.container.html'
})
export class AccessUserEditionContainer extends InfoEditorStatusComponent<User> {

  private readonly service = inject(AccessUserService);

  private readonly router = inject(Router);

  public readingRoleSelection = false;

  public readingMemberSelection = false;

  public readingMember = false;

  public changingActive = false;

  public rolesSelection = new PaginatedResponse<Role>();

  public membersSelection = new PaginatedResponse<Member>();

  public member = new Member();

  private username = '';

  constructor() {
    const route = inject(ActivatedRoute);
    const authContainer = inject(AuthContainer);

    super(new User());
    // Check permissions
    this.editable = authContainer.hasPermission("user", "update");
    this.deletable = authContainer.hasPermission("user", "delete");

    // Get id
    route.paramMap.subscribe(params => {
      const usernameParam = params.get('user');
      if (usernameParam) {
        this.username = usernameParam;
      }
      this.load();
    });

    // Load member
    this.service.getMember(this.username).subscribe({
      next: response => {
        if (response) {
          this.member = response;
        } else {
          this.member = new Member();
        }

        // Reactivate view
        this.readingMember = false;
      },
      error: error => {
        // Reactivate view
        this.readingMember = false;
      }
    });

    this.onGoToRoleSelectionPage(1);
  }

  public onGoToRoleSelectionPage(page: number) {
    this.readingRoleSelection = true;
    this.service.getAvailableRoles(this.username, page).subscribe({
      next: response => {
        this.rolesSelection = response;

        // Reactivate view
        this.readingRoleSelection = false;
      },
      error: error => {
        // Reactivate view
        this.readingRoleSelection = false;
      }
    });
  }

  public onGoToMemberSelectionPage(page: number) {
    this.readingMemberSelection = true;
    this.service.getAvailableMembers(this.username, page).subscribe({
      next: response => {
        this.membersSelection = response;

        // Reactivate view
        this.readingMemberSelection = false;
      },
      error: error => {
        // Reactivate view
        this.readingMemberSelection = false;
      }
    });
  }

  public onAddRole(role: Role): void {
    this.data.roles.push(role);
    this.onSave(this.data);
  }

  public onSelectMember(member: Member): void {
    this.service.assignMember(this.username, member).subscribe({
      next: response => {
        this.member = response;

        // Reactivate view
      },
      error: error => {
        // Reactivate view
      }
    });
  }

  public onRemoveRole(role: Role): void {
    this.data.roles = this.data.roles.filter(r => r.name != role.name);
    this.onSave(this.data);
  }

  public onDisable() {
    const user = this.data;
    user.enabled = false;
    this.changingActive = true;
    this.onSave(user);
  }

  public onEnable() {
    const user = this.data;
    user.enabled = true;
    this.changingActive = true;
    this.onSave(user);
  }

  protected override delete(): void {
    this.service.delete(this.data.username).subscribe(r => {
      this.router.navigate([`/security/users`]);
    });
  }

  protected override read(): Observable<User> {
    return this.service.getOne(this.username);
  }

  protected override save(toSave: User): Observable<User> {
    const updated: UserUpdate = { ...this.data, ...toSave, roles: this.data.roles.map(r => r.name) };

    return this.service.update(toSave.username, updated);
  }

  protected override interceptSave(response: User) {
    super.interceptSave(response);
    this.changingActive = false;
  }

}
