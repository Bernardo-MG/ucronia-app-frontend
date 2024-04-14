import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '../../../services/layout.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'layout-header-navigation-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './header-navigation-wrapper.component.html'
})
export class HeaderNavigationWrapperComponent implements OnInit {

  public title = '';

  public loggedIn = false;

  public showConfigMenu = false;

  constructor(
    private authContainer: AuthContainer,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.loggedIn = u.logged });
    this.title = this.layoutService.getTitle();
    this.showConfigMenu = this.layoutService.showConfigurationLink();
  }

}
