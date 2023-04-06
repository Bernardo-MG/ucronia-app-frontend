import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';

@Component({
  selector: 'layout-header-frame',
  templateUrl: './layout-header-frame.component.html',
  styleUrls: ['./layout-header-frame.component.sass']
})
export class LayoutHeaderFrameComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
