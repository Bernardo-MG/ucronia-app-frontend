import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { AccessUserService } from '../../services/access-user.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'access-user-create-view',
  templateUrl: './access-user-create-view.component.html'
})
export class AccessUserCreateViewComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: Failure[] = [];

  public fields: FormDescription[] = [
    new FormDescription('Username', 'username', 'string', Validators.required),
    new FormDescription('Name', 'name', 'string', Validators.required),
    new FormDescription('Email', 'email', 'string', Validators.required),
    new FormDescription('Credentials expired', 'credentialsExpired', 'boolean', Validators.required),
    new FormDescription('Enabled', 'enabled', 'boolean', Validators.required),
    new FormDescription('Expired', 'expired', 'boolean', Validators.required),
    new FormDescription('Locked', 'locked', 'boolean', Validators.required)
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
