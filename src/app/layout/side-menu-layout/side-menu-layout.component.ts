import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';

@Component({
  selector: 'layout-side-menu',
  templateUrl: './side-menu-layout.component.html',
  styleUrls: ['./side-menu-layout.component.sass']
})
export class SideMenuLayoutComponent {

  public loggedIn: boolean = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
