import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-create',
  templateUrl: './access-user-create.component.html'
})
export class AccessUserCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures: Failure[] = [];

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
