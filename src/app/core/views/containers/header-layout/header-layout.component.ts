import { Component } from '@angular/core';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'view-header-layout',
  templateUrl: './header-layout.component.html'
})
export class HeaderLayoutComponent {

  public title;

  public loggedIn = false;

  constructor(
    private securityContainer: SecurityContainer,
    viewService: ViewService
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.loggedIn = u.logged });
    this.title = viewService.getTitle();
  }

}
