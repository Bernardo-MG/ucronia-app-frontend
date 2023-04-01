import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/core/models/role';
import { SecurityRoleService } from '../../service/security-role.service';

@Component({
  selector: 'security-role-create-view',
  templateUrl: './security-role-create-view.component.html',
  styleUrls: ['./security-role-create-view.component.sass']
})
export class SecurityRoleCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public role = new Role();

  public formValid = false;

  constructor(
    private service: SecurityRoleService,
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
