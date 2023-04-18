import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-create-view',
  templateUrl: './access-role-create-view.component.html',
  styleUrls: ['./access-role-create-view.component.sass']
})
export class AccessRoleCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public role = new Role();

  public formValid = false;

  constructor(
    private service: AccessRoleService,
    private router: Router
  ) { }

  public onSave(): void {
    this.waiting = true;
    this.service.create(this.role).subscribe({
      next: d => {
        this.router.navigate([`/security/roles/${d.id}`]);
        // Reactivate view
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: Role) {
    this.role = value;
  }

}
