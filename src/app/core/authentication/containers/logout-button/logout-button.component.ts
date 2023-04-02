import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/login.service';

/**
 * Logout button container. Smart component for handling the form. On click logs out.
 */
@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.sass']
})
export class LogoutButtonComponent {

  private loginUrl = '/login';

  public logoutIcon = faRightFromBracket;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public onLogout() {
    this.loginService.logout();
    this.router.navigate([this.loginUrl]);
  }

}
