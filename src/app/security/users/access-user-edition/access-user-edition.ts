
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
import { finalize, Observable } from 'rxjs';
import { AccessUserForm } from '../access-user-form/access-user-form';
import { AccessUserMemberEditor } from '../access-user-member-editor/access-user-member-editor';
import { AccessUserRolesEditor } from '../access-user-roles-editor/access-user-roles-editor';
import { AccessUserService } from '../access-user-service';
import { UserUpdate } from '../models/user-update';

@Component({
  selector: 'access-user-edition',
  imports: [CommonModule, CardModule, SkeletonModule, ButtonModule, AccessUserForm, ModalComponent, AccessUserRolesEditor, AccessUserMemberEditor, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './access-user-edition.html'
})
export class AccessUserEdition extends InfoEditorStatusComponent<User> {

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
    route.paramMap
      .subscribe(params => {
        const usernameParam = params.get('user');
        if (usernameParam) {
          this.username = usernameParam;
        }
        this.load();
      });

    // Load member
    this.service.getMember(this.username)
      .pipe(finalize(() => this.readingMember = false))
      .subscribe(response => {
        if (response) {
          this.member = response;
        } else {
          this.member = new Member();
        }
      });

    this.onGoToRoleSelectionPage(1);
  }

  public onGoToRoleSelectionPage(page: number) {
    this.readingRoleSelection = true;
    this.service.getAvailableRoles(this.username, page)
      .pipe(finalize(() => this.readingRoleSelection = false))
      .subscribe(response => this.rolesSelection = response);
  }

  public onGoToMemberSelectionPage(page: number) {
    this.readingMemberSelection = true;
    this.service.getAvailableMembers(this.username, page)
      .pipe(finalize(() => this.readingMemberSelection = false))
      .subscribe(response => this.membersSelection = response);
  }

  public onAddRole(role: Role): void {
    this.data.roles.push(role);
    this.onSave(this.data);
  }

  public onSelectMember(member: Member): void {
    this.service.assignMember(this.username, member)
      .subscribe(response => this.member = response);
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
    this.service.delete(this.data.username)
      .subscribe(r => this.router.navigate([`/security/users`]));
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
