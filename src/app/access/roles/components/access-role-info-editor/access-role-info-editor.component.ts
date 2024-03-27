import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleAddPermissionComponent } from '../access-role-add-permission/access-role-add-permission.component';
import { AccessRoleFormComponent } from '../access-role-form/access-role-form.component';
import { AccessRoleInfoComponent } from '../access-role-info/access-role-info.component';
import { AccessRolePermissionsComponent } from '../access-role-permissions/access-role-permissions.component';

@Component({
  selector: 'access-role-info-editor',
  standalone: true,
  imports: [CommonModule, LayoutModule, AccessRoleFormComponent, AccessRoleInfoComponent, AccessRolePermissionsComponent, AccessRoleAddPermissionComponent],
  templateUrl: './access-role-info-editor.component.html'
})
export class AccessRoleInfoEditorComponent extends InfoEditorComponent<Role> implements OnInit {

  public permissionView = 'list';

  private role = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessRoleService,
    private authContainer: AuthContainer
  ) {
    super(new Role());
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const roleParam = params.get('role');
      if (roleParam) {
        this.role = roleParam;
      }
      this.load();
    });
  }

  public onShowAddPermission() {
    this.permissionView = 'add';
  }

  public onCancelAddPermission() {
    this.permissionView = 'list';
  }

  public isAbleToAddPermission() {
    return true;
  }

  public onAddPermission() {
    this.permissionView = 'list';
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate([`/roles`]);
    });
  }

  protected override read(): Observable<Role> {
    return this.service.getOne(this.role);
  }

  protected override save(toSave: Role): Observable<Role> {
    return this.service.update(toSave.name, toSave);
  }

}
