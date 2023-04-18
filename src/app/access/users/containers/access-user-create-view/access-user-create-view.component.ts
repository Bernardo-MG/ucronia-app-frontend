import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-create-view',
  templateUrl: './access-user-create-view.component.html',
  styleUrls: ['./access-user-create-view.component.sass']
})
export class AccessUserCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public user = new User();

  public formValid = false;

  constructor(
    private service: AccessUserService,
    private router: Router
  ) { }

  public onSave(): void {
    this.waiting = true;
    this.service.create(this.user).subscribe({
      next: d => {
        this.router.navigate([`/security/users/${d.id}`]);
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

  public onFormChange(value: User) {
    this.user = value;
  }

}
