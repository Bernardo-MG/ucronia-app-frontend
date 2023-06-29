import { Component } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { Menu } from '@app/shared/menu/models/menu';
import { LayoutService } from '../../../core/layout/services/layout.service';

@Component({
  selector: 'account-layout',
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public title;

  public loggedIn = false;

  public menus: Menu[] = [
    {
      title: 'Account', links: [
        { title: 'Profile', path: '/account/settings/profile' },
        { title: 'Change password', path: '/account/settings/password' }
      ]
    }
  ];

  constructor(
    private authService: AuthService,
    viewService: LayoutService
  ) {
    this.authService.getStatus().subscribe(u => { this.loggedIn = u.logged });
    this.title = viewService.getTitle();
  }

}
