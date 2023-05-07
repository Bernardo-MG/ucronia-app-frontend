import { Component } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
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
    private authService: AuthService,
    viewService: ViewService
  ) {
    this.authService.getStatus().subscribe(u => { this.loggedIn = u.logged });
    this.title = viewService.getTitle();
  }

}
