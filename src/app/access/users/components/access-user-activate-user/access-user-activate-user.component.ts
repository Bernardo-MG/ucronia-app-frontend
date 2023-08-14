import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserActivate } from '../../models/user-activate';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-activate-user',
  templateUrl: './access-user-activate-user.component.html',
  styleUrls: ['./access-user-activate-user.component.sass']
})
export class AccessUserActivateUserComponent implements OnInit {

  public validToken = false;

  public changed = false;

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public loading = false;

  public finished = false;

  private token = '';

  constructor(
    private route: ActivatedRoute,
    private service: AccessUserService
  ) { }

  public ngOnInit(): void {
    // Validate token
    this.route.paramMap.subscribe(params => {
      this.load(params.get('token'));
    });
  }

  public onUserActivate(password: string): void {
    const reset = new UserActivate();
    reset.password = password;
    this.loading = true;
    this.finished = false;
    this.service.activateUser(this.token, reset).subscribe(r => {
      this.changed = true;
      this.loading = false;
      this.finished = true;
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.token = token;
      this.service.validateActivateUserToken(token).subscribe(r => {
        this.validToken = r.content;
      });
    }
  }

}
