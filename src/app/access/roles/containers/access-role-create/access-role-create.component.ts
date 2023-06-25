import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: AccessRoleService,
    private router: Router
    ) { }

  public onSave(role: Role): void {
    this.saving = true;
    this.service.create(role).subscribe({
      next: d => {
        this.router.navigate([`/security/roles/${d.id}`]);
        this.failures = {};
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if(error.failures){
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
