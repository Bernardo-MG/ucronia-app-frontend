import { Component, Input } from '@angular/core';
import { Menu } from '../model/menu';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.sass']
})
export class NavigationMenuComponent {

  @Input() menus: Menu[] = [];

  @Input() title: String = '';

  constructor() { }

}
