import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'layout-navbar-body',
  templateUrl: './navbar-body.component.html',
  styleUrls: ['./navbar-body.component.sass']
})
export class NavbarBodyComponent implements OnInit {

  public title = '';

  public loggedIn = false;

  public menus: Menu[] = [];

  constructor(
    private authContainer: AuthContainer,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.loggedIn = u.logged });
    this.title = this.layoutService.getTitle();
    this.menus = this.layoutService.getMenus();
  }

}
