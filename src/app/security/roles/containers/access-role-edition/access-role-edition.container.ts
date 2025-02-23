import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { Role } from '@app/core/authentication/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ModalComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { AccessRoleAddPermissionComponent } from '../../components/access-role-add-permission/access-role-add-permission.component';
import { AccessRoleInfoComponent } from '../../components/access-role-info/access-role-info.component';
import { AccessRolePermissionsComponent } from '../../components/access-role-permissions/access-role-permissions.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
    selector: 'access-role-edition',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AccessRoleInfoComponent, AccessRolePermissionsComponent, AccessRoleAddPermissionComponent, ArticleComponent, ModalComponent, IconAddComponent, ControlButtonsComponent, ResponsiveShortColumnsDirective, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent],
    templateUrl: './access-role-edition.container.html'
})
export class AccessRoleInfoEditionContainer extends InfoEditorStatusComponent<Role> implements OnInit {

  public permissions = new PaginatedResponse<ResourcePermission>();

  public view: string = 'details';

  private permissionsSort = new Sorting();

  private role = '';

  @ViewChild('pickCloseButton') private pickCloseButton: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessRoleService,
    private authContainer: AuthContainer
  ) {
    super(new Role());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const roleParam = params.get('role');
      if (roleParam) {
        this.role = roleParam;
        this.load();

        // Initial permissions
        this.onLoadPermissions(0);
      }
    });
  }

  public onChangeView(newView: string) {
    this.view = newView;
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

  public onLoadPermissions(page: number) {
    this.service.getAvailablePermissions(this.role, page, this.permissionsSort).subscribe({
      next: response => {
        this.permissions = response;
      }
    });
  }

  public onChangePermissionsDirection(field: SortingProperty) {
    this.permissionsSort.addField(field);
    this.onLoadPermissions(0);
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
  
  protected override interceptSave(response: Role) {
    super.interceptSave(response);
    this.onLoadPermissions(0);
  }

}
