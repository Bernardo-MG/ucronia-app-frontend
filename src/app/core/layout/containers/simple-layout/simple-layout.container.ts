import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { AuthContainer } from '@bernardo-mg/authentication';

@Component({
  selector: 'layout-simple-layout-layout',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './simple-layout.container.html'
})
export class SimpleLayoutContainer {

  private readonly authContainer = inject(AuthContainer);

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public get loggedIn() {
    return this.authContainer.logged;
  }

  constructor(
    layoutService: LayoutService
  ) {
    // App title
    this.title = layoutService.getTitle();

    // Show links
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
    this.showAssociation = layoutService.showAssociationLink();
  }

}
