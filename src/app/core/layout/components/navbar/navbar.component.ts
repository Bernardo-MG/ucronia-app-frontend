import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from '../account-dropdown/account-dropdown.component';
import { ConfigDropdownComponent } from '../config-dropdown/config-dropdown.component';

@Component({
  selector: 'layout-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountMenuComponent, ConfigDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;
  
  @Input() public showConfigMenu = false;

}
