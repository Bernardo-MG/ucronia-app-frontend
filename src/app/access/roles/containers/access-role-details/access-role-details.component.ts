import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { PageInfo } from '@app/core/api/models/page-info';
import { Action } from '@app/core/authentication/models/action';
import { Resource } from '@app/core/authentication/models/resource';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';
import { Permission } from '@app/core/authentication/models/permission';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'access-role-details',
  templateUrl: './access-role-details.component.html'
})
export class AccessRoleDetailsComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public valid = false;

  public editing = false;

  public editPermission = false;

  public deletePermission = false;

  /**
   * Loading flag.
   */
  public waiting = false;

  public waitingPermissions = false;

  public waitingActionsSelection = false;

  public waitingResourcesSelection = false;

  public data = new Role();

  public formValid = false;

  public permissions: Permission[] = [];

  public actionSelection: Action[] = [];

  public totalActionPages = 0;

  public resourceSelection: Resource[] = [];

  public totalResourcePages = 0;

  public permissionsPageInfo = new PageInfo();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessRoleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("user", "update");
    this.deletePermission = this.authService.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(data: Role): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/security/users/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onChange(changed: Role) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Role) {
    this.data = value;
  }

  public onAddSelectedPermission(): void {
  }

  public onAddPermission(permission: Permission): void {
    this.service.addPermission(this.data.id, permission.resourceId, permission.actionId).subscribe(p => this.onGoToPermissionPage(0));
  }

  public onRemovePermission(permission: Permission): void {
    this.service.removePermission(this.data.id, permission.resourceId, permission.actionId).subscribe(p => this.onGoToPermissionPage(0));
  }

  public onGoToPermissionSelectionPage(page: number) {
    this.waitingActionsSelection = true;
    this.service.getActionSelection(page).subscribe(response => {
      this.actionSelection = response.content;
      this.totalActionPages = response.totalPages;
      this.waitingActionsSelection = false;
    });
    this.waitingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe(response => {
      this.resourceSelection = response.content;
      this.totalResourcePages = response.totalPages;
      this.waitingResourcesSelection = false;
    });
  }

  public onGoToActionSelectionPage(page: number) {
    this.waitingActionsSelection = true;
    this.service.getActionSelection(page).subscribe(response => {
      this.actionSelection = response.content;
      this.totalActionPages = response.totalPages;
      this.waitingActionsSelection = false;
    });
  }

  public onGoToResourceSelectionPage(page: number) {
    this.waitingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe(response => {
      this.resourceSelection = response.content;
      this.totalResourcePages = response.totalPages;
      this.waitingResourcesSelection = false;
    });
  }

  public onGoToPermissionPage(page: number) {
    this.waitingPermissions = true;
    this.service.getPermissions(this.data.id, page).subscribe(response => {
      this.permissions = response.content;
      this.permissionsPageInfo = response;
      this.waitingPermissions = false;
    });
  }

  public onSelectPermission(): void {
  }

  public onSelectAction(): void {
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
          this.onGoToPermissionPage(0);
        });
    }
  }

  public isAbleToAddPermission() {
    return true;
  }

  public isEditable() {
    return this.editPermission && this.editing;
  }

}
