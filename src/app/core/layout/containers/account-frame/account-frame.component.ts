import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'layout-account-frame',
  templateUrl: './account-frame.component.html',
  styleUrls: ['./account-frame.component.sass']
})
export class AccountFrameComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  public menus: Menu[] = [
    {
      title: 'Account', links: [
        { title: 'Profile', path: '/account/settings/profile' },
        { title: 'Password', path: '/account/settings/password' }
      ]
    }
  ];

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
