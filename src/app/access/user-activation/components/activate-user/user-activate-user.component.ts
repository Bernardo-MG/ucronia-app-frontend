import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { UserActivate } from '../../models/user-activate';
import { AccessUserActivateService } from '../../services/user-activate.service';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'access-user-activate-user',
  templateUrl: './user-activate-user.component.html'
})
export class UserActivateUserComponent implements OnInit {

  public validating = false;

  public activating = false;

  public status = 'valid_token';

  public username = '';

  private token = '';

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private service: AccessUserActivateService
  ) { }

  public ngOnInit(): void {
    // Validate token
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.validate(token);
      }
    });
  }

  public onActivateUser(confirm: ConfirmPassword): void {
    this.validating = true;

    this.failures = {};

    const reset = new UserActivate();
    reset.password = confirm.password;
    this.service.activateUser(this.token, reset).subscribe({
      next: response => {
        this.status = 'finished';
        this.validating = false;
      },
      error: response => {
        // TODO: Unwrap error response automatically
        if (response.error.failures) {
          this.failures = response.error.failures;
        } else {
          this.failures = {};
        }
        this.validating = false;
      }
    });
  }

  private validate(token: string): void {
    this.validating = true;
    this.service.validateActivateUserToken(token).subscribe({
      next: response => {
        if (!response.content.valid) {
          this.status = 'invalid_token';
        } else {
          this.token = token;
        }
        this.validating = false;
      },
      error: response => {
        this.validating = false;
      }
    });
  }

}
