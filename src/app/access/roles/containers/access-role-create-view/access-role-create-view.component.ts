import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { AccessRoleService } from '../../services/access-role.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'access-role-create-view',
  templateUrl: './access-role-create-view.component.html'
})
export class AccessRoleCreateViewComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: Failure[] = [];

  public fields: FormDescription[] = [
    new FormDescription('Name', 'name', 'string', Validators.required)
  ];

  constructor(
    private service: AccessRoleService,
    private router: Router
  ) { }

  public onSave(role: Role): void {
    this.saving = true;
    this.service.create(role).subscribe({
      next: d => {
        this.router.navigate([`/security/roles/${d.id}`]);
        this.failures = [];
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        this.failures = error.failures;
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
