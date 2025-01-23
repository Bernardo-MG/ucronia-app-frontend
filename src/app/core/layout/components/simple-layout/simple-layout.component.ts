import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { NavbarComponent } from '../header/navbar/navbar.component';

@Component({
    selector: 'app-simple-layout',
    imports: [RouterModule, NavbarComponent],
    templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent implements OnInit {

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public showAdmin = false;

  public get loggedIn() {
    return this.authContainer.isLogged();
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
    this.showAdmin = this.layoutService.showAssociationAdminLink();
  }

}
