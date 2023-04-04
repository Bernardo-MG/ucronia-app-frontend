import { Component, Input } from '@angular/core';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  
  @Input() id = '';

  @Input() menus: Menu[] = [];

}
