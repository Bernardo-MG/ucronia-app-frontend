import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '@app/shared/menu/models/menu';
import { AccountMenuComponent } from '../account-dropdown/account-dropdown.component';

@Component({
  selector: 'layout-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountMenuComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;
  
  @Input() public menus: Menu[] = [];

}
