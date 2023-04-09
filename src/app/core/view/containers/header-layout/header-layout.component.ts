import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';

@Component({
  selector: 'view-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.sass']
})
export class HeaderLayoutComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
