import { Component } from '@angular/core';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'view-account-layout',
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  public menus: Menu[] = [
    {
      title: 'Account', links: [
        {
          title: 'Profile', links: [
            { title: 'Info', path: '/account/settings/profile' }
          ]
        },
        {
          title: 'Password', links: [
            { title: 'Change', path: '/account/settings/password' }
          ]
        }
      ]
    }
  ];

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
