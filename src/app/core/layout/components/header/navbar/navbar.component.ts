import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AccountMenuComponent } from '../account-dropdown/account-dropdown.component';

@Component({
  selector: 'layout-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, AccountMenuComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public showConfig = false;

  @Input() public showSecurity = false;

}
