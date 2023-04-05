import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'layout-account',
  templateUrl: './layout-account.component.html',
  styleUrls: ['./layout-account.component.sass']
})
export class AccountLayoutComponent {

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
