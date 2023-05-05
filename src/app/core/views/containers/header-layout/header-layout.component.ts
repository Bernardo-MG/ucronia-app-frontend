import { Component } from '@angular/core';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';

@Component({
  selector: 'view-header-layout',
  templateUrl: './header-layout.component.html'
})
export class HeaderLayoutComponent {

  public title = 'Association App Frontend';

  public loggedIn = false;

  constructor(
    private securityContainer: SecurityContainer
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
