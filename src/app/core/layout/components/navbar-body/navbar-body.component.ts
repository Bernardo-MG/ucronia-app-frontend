import { Component } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-navbar-body',
  templateUrl: './navbar-body.component.html'
})
export class NavbarBodyComponent {

  public title;

  public loggedIn = false;

  constructor(
    private authService: AuthService,
    layoutService: LayoutService
  ) {
    this.authService.getStatus().subscribe(u => { this.loggedIn = u.logged });
    this.title = layoutService.getTitle();
  }

}
