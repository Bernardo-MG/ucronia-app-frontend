import { Component, Input } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;
  
  @Input() public menus: Menu[] = [];

}
