import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Menu } from '@app/shared/menu/models/menu';
import { LayoutService } from '../../services/layout.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'layout-main-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './main-navigation-layout.component.html',
  styleUrls: ['./main-navigation-layout.component.sass']
})
export class MainNavigationLayoutComponent implements OnInit {

  public title = '';

  public loggedIn = false;

  public showConfigMenu = false;

  public menus: Menu[] = [];

  constructor(
    private authContainer: AuthContainer,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.loggedIn = u.logged });
    this.title = this.layoutService.getTitle();
    this.menus = this.layoutService.getMenus();
    this.showConfigMenu = this.layoutService.showConfigurationLink();
  }

}
