import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Observable } from 'rxjs';
import { UserUpdate } from '../../models/user-update';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserAddRoleComponent } from '../access-user-add-role/access-user-add-role.component';
import { AccessUserFormComponent } from '../access-user-form/access-user-form.component';
import { AccessUserInfoComponent } from '../access-user-info/access-user-info.component';
import { AccessUserRoleFormComponent } from '../access-user-roles/access-user-roles.component';

@Component({
  selector: 'access-user-info-editor',
  standalone: true,
  imports: [CommonModule, AccessUserFormComponent, AccessUserInfoComponent, AccessUserRoleFormComponent, AccessUserAddRoleComponent, ArticleComponent, EditionWrapperComponent, WaitingButtonComponent],
  templateUrl: './access-user-info-editor.component.html'
})
export class AccessUserInfoEditorComponent extends InfoEditorComponent<User> implements OnInit {

  public view: 'user' | 'roles' = 'user';

  public roleView = 'list';

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

  public onAddRole(role: Role): void {
    this.data.roles.push(role);
    this.onSave(this.data);
    this.roleView = "list";
  }

  public onRemoveRole(role: Role): void {
    this.data.roles = this.data.roles.filter(r => r.name != role.name);
    this.onSave(this.data);
  }

  public onShowAddRole() {
    this.roleView = "add";
  }

  public onCancelAddRole() {
    this.roleView = "list";
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

  public onChangeView(newView: 'user' | 'roles') {
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
