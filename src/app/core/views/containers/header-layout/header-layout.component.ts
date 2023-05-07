import { Component } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'view-header-layout',
  templateUrl: './header-layout.component.html'
})
export class HeaderLayoutComponent {

  public title;

  public loggedIn = false;

  constructor(
    private authService: AuthService,
    viewService: ViewService
  ) {
    this.authService.getStatus().subscribe(u => { this.loggedIn = u.logged });
    this.title = viewService.getTitle();
  }

}
