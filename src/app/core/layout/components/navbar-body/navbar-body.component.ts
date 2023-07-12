import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'layout-navbar-body',
  templateUrl: './navbar-body.component.html'
})
export class NavbarBodyComponent implements OnInit {

  public title = '';

  public loggedIn = false;
  
  public menus: Menu[] = [];

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(u => { this.loggedIn = u.logged });
    this.title = this.layoutService.getTitle();
    this.menus = this.layoutService.getMenus();
  }

}
