import { Component, Input } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'shared-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class MenuComponent {
  
  @Input() menus: Menu[] = [];

}
