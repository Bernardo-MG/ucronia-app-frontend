import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { Role } from '@app/core/authentication/models/role';
import { throwError } from 'rxjs';
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

  public failures = new FieldFailures();

  constructor(
    private service: AccessRoleService,
    private router: Router
  ) { }

  public onSave(data: Role): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/roles/${d.name}`]);
        this.failures = new FieldFailures();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures = new FieldFailures();
        }
        // Reactivate view
        this.saving = false;

        return throwError(() => error);
      }
    });
  }

}
