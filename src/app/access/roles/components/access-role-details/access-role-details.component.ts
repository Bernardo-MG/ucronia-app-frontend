import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { Role } from '@app/core/authentication/models/role';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { AccessRoleService } from '../../services/access-role.service';
import { Permission } from '@app/core/authentication/models/permission';

@Component({
  selector: 'access-role-details',
  templateUrl: './access-role-details.component.html'
})
export class AccessRoleDetailsComponent implements OnInit {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public permissionView = 'list';

  public roleId = 0;

  public error = false;

  public data = new Role();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessRoleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("user", "update");
    this.deletable = this.authService.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Role): void {
    this.saving = true;
    this.service.update(data.id, data).subscribe({
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
      this.router.navigate([`/roles`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onShowAddPermission() {
    this.permissionView = 'add';
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.roleId = identifier;
      this.reading = true;
      this.service.getOne(identifier)
        .subscribe({
          next: response => {
            this.data = response;
            this.reading = false;
          },
          error: error => {
            this.error = true;
            this.reading = false;
          }
        });
    }
  }

  public isAbleToAddPermission() {
    return true;
  }

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

  public onAddPermission(permission: Permission) {
    this.service.addPermission(this.roleId, permission.resourceId, permission.actionId).subscribe(p => {
      this.permissionView = 'list';
      // TODO: Load permissions
    });
  }

}
