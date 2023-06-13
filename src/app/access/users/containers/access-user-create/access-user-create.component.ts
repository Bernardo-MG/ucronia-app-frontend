import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public failures = new Map<string, Failure[]>();

  public valid = false;

  constructor(
    private service: AccessUserService,
    private router: Router
    ) { }

  public onSave(user: User): void {
    this.saving = true;
    this.service.create(user).subscribe({
      next: d => {
        this.router.navigate([`/security/users/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if(error.failures){
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

}
