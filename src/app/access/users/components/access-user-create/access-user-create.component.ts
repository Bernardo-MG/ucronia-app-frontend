import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { User } from '@app/core/authentication/models/user';
import { throwError } from 'rxjs';
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

  public failures = new FieldFailures();

  constructor(
    private service: AccessUserService,
    private router: Router
  ) { }

  public onSave(data: User): void {
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/users/${d.username}`]);
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
