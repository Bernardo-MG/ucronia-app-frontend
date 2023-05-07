import { Component } from '@angular/core';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { Menu } from '@app/shared/menu/models/menu';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'view-account-layout',
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public title;

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
    private securityContainer: SecurityContainer,
    viewService: ViewService
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.loggedIn = u.logged });
    this.title = viewService.getTitle();
  }

}
