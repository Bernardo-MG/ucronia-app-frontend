import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { PublicNavbarComponent } from '@app/frontpage/components/layout/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule, PublicNavbarComponent, SideMenuComponent],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {

  public title = '';

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
  }

}
