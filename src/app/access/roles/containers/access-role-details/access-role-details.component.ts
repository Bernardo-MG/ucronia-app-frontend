import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { PageInfo } from '@app/core/api/models/page-info';
import { Action } from '@app/core/authentication/models/action';
import { Resource } from '@app/core/authentication/models/resource';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';
import { Permission } from '@app/core/authentication/models/permission';

@Component({
  selector: 'access-role-details',
  templateUrl: './access-role-details.component.html'
})
export class AccessRoleDetailsComponent implements OnInit {

  /**
   * Loading flag.
   */
  public waiting = false;

  public waitingPermissions = false;

  public waitingActionsSelection = false;

  public waitingResourcesSelection = false;

  public role = new Role();

  public formValid = false;

  public permissions: Permission[] = [];

  public actionSelection: Action[] = [];

  public resourceSelection: Resource[] = [];

  public selectingPermission = false;

  public actionSelectionPageInfo = new PageInfo();

  public resourceSelectionPageInfo = new PageInfo();

  public permissionsPageInfo = new PageInfo();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private service: AccessRoleService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Role): void {
    this.waiting = true;
    this.service.create(data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onShowAddPermission(): void {
    this.selectingPermission = true;
  }

  public onAddPermission(data: Permission): void {
    this.service.addPermission(this.role.id, data.resourceId, data.actionId).subscribe(p => this.onGoToPermissionPage(0));
    this.selectingPermission = false;
  }

  public onRemovePermission(data: Permission): void {
    this.service.removePermission(this.role.id, data.resourceId, data.actionId).subscribe(p => this.onGoToPermissionPage(0));
  }

  public onGoToPermissionSelectionPage(page: number) {
    this.waitingActionsSelection = true;
    this.service.getActionSelection(page).subscribe(response => {
      this.actionSelection = response.content;
      this.actionSelectionPageInfo = response;
      this.waitingActionsSelection = false;
    });
    this.waitingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe(response => {
      this.resourceSelection = response.content;
      this.resourceSelectionPageInfo = response;
      this.waitingResourcesSelection = false;
    });
  }

  public onGoToPermissionPage(page: number) {
    this.waitingPermissions = true;
    this.service.getPermissions(this.role.id, page).subscribe(response => {
      this.permissions = response.content;
      this.permissionsPageInfo = response;
      this.waitingPermissions = false;
    });
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.role = d;
          this.onGoToPermissionPage(0);
        });
    }
  }

}
