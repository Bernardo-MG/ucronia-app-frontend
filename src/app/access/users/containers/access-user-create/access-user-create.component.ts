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

  public valid = false;

  public failures = new Map<string, Failure[]>();

  public data = new User();

  constructor(
    private service: AccessUserService,
    private router: Router
  ) { }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(toSave: User): void {
    this.data = toSave;
    this.saving = true;
    this.service.create(this.data).subscribe({
      next: d => {
        this.router.navigate([`/members/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public onChange(changed: User) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
