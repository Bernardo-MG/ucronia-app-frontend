import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/security/authentication/service/authentication-container.service';

@Component({
  selector: 'navigation-side-menu-wrapper',
  templateUrl: './navigation-side-menu-wrapper.component.html',
  styleUrls: ['./navigation-side-menu-wrapper.component.sass']
})
export class NavigationSideMenuWrapperComponent {

  public loggedIn: boolean = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
