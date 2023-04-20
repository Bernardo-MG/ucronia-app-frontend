import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';
import { Validators } from '@angular/forms';
import { FormDescription } from '@app/shared/layout/models/form-description';

@Component({
  selector: 'access-role-create-view',
  templateUrl: './access-role-create-view.component.html',
  styleUrls: ['./access-role-create-view.component.sass']
})
export class AccessRoleCreateViewComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    { name: 'Name', property: 'name', type: 'string', validator: Validators.required }
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
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
