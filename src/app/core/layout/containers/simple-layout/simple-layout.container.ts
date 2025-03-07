import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { AuthContainer } from '@bernardo-mg/authentication';

@Component({
    selector: 'layout-simple-layout-layout',
    imports: [RouterModule, NavbarComponent],
    templateUrl: './simple-layout.container.html'
})
export class SimpleLayoutContainer implements OnInit {

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public get loggedIn() {
    return this.authContainer.logged;
  }

  constructor(
    private layoutService: LayoutService,
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show links
    this.showSettings = this.layoutService.showSettingsLink();
    this.showSecurity = this.layoutService.showSecurityLink();
    this.showAssociation = this.layoutService.showAssociationLink();
  }

}
