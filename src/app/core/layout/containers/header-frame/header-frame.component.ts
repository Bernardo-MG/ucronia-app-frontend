import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';

@Component({
  selector: 'layout-header-frame',
  templateUrl: './header-frame.component.html',
  styleUrls: ['./header-frame.component.sass']
})
export class HeaderFrameComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
