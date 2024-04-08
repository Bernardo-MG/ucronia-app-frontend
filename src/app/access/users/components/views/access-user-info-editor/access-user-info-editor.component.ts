import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@app/association/members/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Observable } from 'rxjs';
import { UserUpdate } from '../../../models/user-update';
import { AccessUserService } from '../../../services/access-user.service';
import { AccessUserFormComponent } from '../../form/access-user-form/access-user-form.component';
import { AccessUserMemberEditorComponent } from '../../form/access-user-member-editor/access-user-member-editor.component';
import { AccessUserRolesEditorComponent } from '../../form/access-user-roles-editor/access-user-roles-editor.component';
import { AccessUserInfoComponent } from '../../info/access-user-info/access-user-info.component';

@Component({
  selector: 'access-user-info-editor',
  standalone: true,
  imports: [CommonModule, AccessUserFormComponent, AccessUserInfoComponent, ArticleComponent, EditionWrapperComponent, WaitingButtonComponent, AccessUserRolesEditorComponent, AccessUserMemberEditorComponent],
  templateUrl: './access-user-info-editor.component.html'
})
export class AccessUserInfoEditorComponent extends InfoEditorComponent<User> implements OnInit {

  public view: 'user' | 'roles' | 'member' = 'user';

  public readingRoleSelection = false;

  public readingMemberSelection = false;

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
    this.onSave(user);
  }

  public onEnable() {
    const user = this.data;
    user.enabled = true;
    this.onSave(user);
  }

  public onChangeView(newView: 'user' | 'roles' | 'member') {
    this.view = newView;
  }

  protected override delete(): void {
    this.service.delete(this.data.username).subscribe(r => {
      this.router.navigate([`/users`]);
    });
  }

  protected override read(): Observable<User> {
    return this.service.getOne(this.username);
  }

  protected override save(toSave: User): Observable<User> {
    const updated: UserUpdate = { ...this.data, ...toSave, roles: this.data.roles.map(r => r.name) };

    return this.service.update(toSave.username, updated);
  }

}
