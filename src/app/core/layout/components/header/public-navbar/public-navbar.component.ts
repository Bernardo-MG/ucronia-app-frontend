import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from '../account-dropdown/account-dropdown.component';
import { ConfigDropdownComponent } from '../config-dropdown/config-dropdown.component';

@Component({
  selector: 'layout-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountMenuComponent, ConfigDropdownComponent],
  templateUrl: './public-navbar.component.html'
})
export class PublicNavbarComponent {

  @Input() public title = '';

}
