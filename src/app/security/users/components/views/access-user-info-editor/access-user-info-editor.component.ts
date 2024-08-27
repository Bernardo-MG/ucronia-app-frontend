import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/members/shared/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { UserUpdate } from '../../../models/user-update';
import { AccessUserService } from '../../../services/access-user.service';
import { AccessUserFormComponent } from '../../form/access-user-form/access-user-form.component';
import { AccessUserMemberEditorComponent } from '../../form/access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../../form/access-user-roles-editor/access-user-roles-editor.component';
import { AccessUserInfoDetailsComponent } from '../../info/access-user-info-details/access-user-info-details.component';
import { AccessUserInfoComponent } from '../../info/access-user-info/access-user-info.component';
import { AccessUserStatusComponent } from '../../info/access-user-status/access-user-status.component';

@Component({
  selector: 'access-user-info-editor',
  standalone: true,
  imports: [CommonModule, AccessUserFormComponent, AccessUserInfoDetailsComponent, ArticleComponent, WaitingButtonComponent, AccessUserRolesEditorComponent, AccessUserMemberEditorComponent, ModalComponent, AccessUserStatusComponent, AccessUserInfoComponent, ResponsiveShortColumnsDirective],
  templateUrl: './access-user-info-editor.component.html'
})
export class AccessUserInfoEditorComponent extends InfoEditorStatusComponent<User> implements OnInit {

  public readingRoleSelection = false;

  public readingMemberSelection = false;

  public readingMember = false;

  public changingActive = false;

  public rolesSelection = new PaginatedResponse<Role[]>([]);

  public membersSelection = new PaginatedResponse<Member[]>([]);

  public member = new Member();

  private username = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessUserService,
    private authContainer: AuthContainer
  ) {
    super(new User());
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('user');
      if (usernameParam) {
        this.username = usernameParam;
      }
      this.load();
    });

    // Load member
    this.service.getMember(this.username).subscribe({
      next: response => {
        if(response){
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
