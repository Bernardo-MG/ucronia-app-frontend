import { Component, Input } from '@angular/core';
import { Menu } from '@app/components/models/menu';

@Component({
  selector: 'layout-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.sass']
})
export class HeaderLayoutComponent {

  @Input() public menus: Menu[] = [];

  @Input() public title = '';

  @Input() public loggedIn: boolean = false;

}
