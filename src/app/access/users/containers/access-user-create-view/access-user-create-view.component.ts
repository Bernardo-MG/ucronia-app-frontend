import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { FormDescription } from '@app/shared/layout/models/form-description';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-create-view',
  templateUrl: './access-user-create-view.component.html'
})
export class AccessUserCreateViewComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public fields: FormDescription[] = [
    { name: 'Username', property: 'username', type: 'string', validator: Validators.required },
    { name: 'Name', property: 'name', type: 'string', validator: Validators.required },
    { name: 'Email', property: 'email', type: 'string', validator: Validators.required },
    { name: 'Credentials expired', property: 'credentialsExpired', type: 'boolean', validator: Validators.required },
    { name: 'Enabled', property: 'enabled', type: 'boolean', validator: Validators.required },
    { name: 'Expired', property: 'expired', type: 'boolean', validator: Validators.required },
    { name: 'Locked', property: 'locked', type: 'boolean', validator: Validators.required }
  ];

  constructor(
    private service: AccessUserService,
    private router: Router
  ) { }

  public onSave(user: User): void {
    this.saving = true;
    this.service.create(user).subscribe({
      next: d => {
        this.router.navigate([`/security/users/${d.id}`]);
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
