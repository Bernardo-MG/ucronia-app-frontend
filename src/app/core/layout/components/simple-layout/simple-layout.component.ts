import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { NavbarComponent } from '../header/navbar/navbar.component';

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, SideMenuComponent],
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent {

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
