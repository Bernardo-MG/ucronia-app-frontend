import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { UserActivate } from '../../models/user-activate';
import { AccessUserActivateService } from '../../services/user-activate.service';

@Component({
  selector: 'access-user-activate-user',
  templateUrl: './user-activate-user.component.html'
})
export class UserActivateUserComponent implements OnInit {

  public status = 'valid_token';

  public username = '';

  private token = '';

  constructor(
    private route: ActivatedRoute,
    private service: AccessUserActivateService
  ) { }

  public ngOnInit(): void {
    // Validate token
    this.route.paramMap.subscribe(params => {
      this.load(params.get('token'));
    });
  }

  public onUserActivate(confirm: ConfirmPassword): void {
    const reset = new UserActivate();
    reset.password = confirm.password;
    this.service.activateUser(this.token, reset).subscribe({
      next: d => {
        this.status = 'finished';
      },
      error: error => {
      }
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.token = token;
      this.service.validateActivateUserToken(token).subscribe(r => {
        if (!r.content.valid) {
          this.status = 'invalid_token';
        }
        this.username = r.content.username;
      });
    }
  }

}
