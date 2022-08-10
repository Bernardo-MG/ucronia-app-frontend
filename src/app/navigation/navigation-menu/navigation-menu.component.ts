import { Component, Input } from '@angular/core';
import { MenuLink } from '../model/menu-link';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.sass']
})
export class NavigationMenuComponent {

  @Input() adminLinks: MenuLink[] = [];

  @Input() links: MenuLink[] = [];

  @Input() title: String = '';

  constructor() { }

}
