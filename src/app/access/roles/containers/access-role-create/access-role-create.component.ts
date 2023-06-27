import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-create',
  templateUrl: './access-role-create.component.html'
})
export class AccessRoleCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public valid = false;

  public failures: { [key: string]: Failure[] } = {};

  public data = new Role();

  constructor(
    private service: AccessRoleService,
    private router: Router
  ) { }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(toSave: Role): void {
    this.data = toSave;
    this.saving = true;
    this.service.create(this.data).subscribe({
      next: d => {
        this.router.navigate([`/security/roles/${d.id}`]);
        this.failures = {};
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onChange(changed: Role) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
