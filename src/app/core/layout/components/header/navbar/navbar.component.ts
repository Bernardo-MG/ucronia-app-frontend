import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AccountMenuComponent } from '../account-dropdown/account-dropdown.component';
import { ConfigDropdownComponent } from '../config-dropdown/config-dropdown.component';

@Component({
  selector: 'layout-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, AccountMenuComponent, ConfigDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public showConfigMenu = false;

}
