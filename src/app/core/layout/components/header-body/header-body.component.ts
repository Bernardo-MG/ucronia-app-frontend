import { Component } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-header-body',
  templateUrl: './header-body.component.html'
})
export class HeaderBodyComponent {

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
