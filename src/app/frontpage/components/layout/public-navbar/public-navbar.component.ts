import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from '@app/core/layout/components/header/account-dropdown/account-dropdown.component';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, AccountMenuComponent],
  templateUrl: './public-navbar.component.html'
})
export class PublicNavbarComponent {

  @Input() public title = '';

}
