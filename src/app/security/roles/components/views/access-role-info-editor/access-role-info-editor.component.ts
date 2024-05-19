import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { Role } from '@app/core/authentication/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { AccessRoleService } from '../../../services/access-role.service';
import { AccessRoleAddPermissionComponent } from '../../data/access-role-add-permission/access-role-add-permission.component';
import { AccessRoleInfoComponent } from '../../data/access-role-info/access-role-info.component';
import { AccessRolePermissionsComponent } from '../../data/access-role-permissions/access-role-permissions.component';

@Component({
  selector: 'access-role-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, AccessRoleInfoComponent, AccessRolePermissionsComponent, AccessRoleAddPermissionComponent, ArticleComponent],
  templateUrl: './access-role-info-editor.component.html'
})
export class AccessRoleInfoEditorComponent extends InfoEditorStatusComponent<Role> implements OnInit {

  private role = '';

  @ViewChild('pickCloseButton') pickCloseButton: any;

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
    this.editable = false;
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

  public onAddPermission(permission: ResourcePermission): void {
    this.data.permissions.push(permission);
    this.onSave(this.data);
    this.pickCloseButton.nativeElement.click();
  }

  public onRemovePermission(permission: ResourcePermission): void {
    this.data.permissions = this.data.permissions.filter(r => r.name != permission.name);
    this.onSave(this.data);
  }

  public isAbleToAddPermission() {
    return true;
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate([`/security/roles`]);
    });
  }

  protected override read(): Observable<Role> {
    return this.service.getOne(this.role);
  }

  protected override save(toSave: Role): Observable<Role> {
    return this.service.update(toSave.name, toSave);
  }

}
