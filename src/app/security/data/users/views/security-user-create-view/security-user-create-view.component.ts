import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/security/models/user';
import { SecurityUserService } from '../../service/security-user.service';

@Component({
  selector: 'security-user-create-view',
  templateUrl: './security-user-create-view.component.html',
  styleUrls: ['./security-user-create-view.component.sass']
})
export class SecurityUserCreateViewComponent {

  /**
   * Loading flag.
   */
  public waiting = false;

  public user = new User();

  public formValid = false;

  constructor(
    private service: SecurityUserService,
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
