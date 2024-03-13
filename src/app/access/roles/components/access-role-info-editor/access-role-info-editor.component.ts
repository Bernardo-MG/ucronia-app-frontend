import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Permission } from '@app/core/authentication/models/permission';
import { Role } from '@app/core/authentication/models/role';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { throwError } from 'rxjs';
import { AccessRoleService } from '../../services/access-role.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';

@Component({
  selector: 'access-role-info-editor',
  templateUrl: './access-role-info-editor.component.html'
})
export class AccessRoleInfoEditorComponent extends InfoEditorComponent implements OnInit {

  public permissionView = 'list';

  public role = "";

  public data = new Role();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessRoleService,
    private authContainer: AuthContainer
  ) {
    super();
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('role'));
    });
  }

  public onSave(toSave: Role): void {
    this.saving = true;
    this.service.update(toSave.name, toSave).subscribe({
      next: d => {
        this.data = d;

        this.failures.clear();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        // Reactivate view
        this.editing = false;

        return throwError(() => error);
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate([`/roles`]);
    });
  }

  public onShowAddPermission() {
    this.permissionView = 'add';
  }

  public onCancelAddPermission() {
    this.permissionView = 'list';
  }

  private load(id: string | null): void {
    if (id) {
      this.role = id;
      this.reading = true;
      this.service.getOne(id)
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

  public onAddPermission(permission: Permission) {
    this.permissionView = 'list';
  }

}
