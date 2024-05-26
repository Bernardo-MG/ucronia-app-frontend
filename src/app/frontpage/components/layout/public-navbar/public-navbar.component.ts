import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule],
  templateUrl: './public-navbar.component.html'
})
export class PublicNavbarComponent {

  @Input() public title = '';

}
