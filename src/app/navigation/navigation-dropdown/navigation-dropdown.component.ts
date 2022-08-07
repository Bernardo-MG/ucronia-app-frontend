import { Component, Input } from '@angular/core';
import { MenuLink } from '../model/menu-link';

@Component({
  selector: 'navigation-dropdown',
  templateUrl: './navigation-dropdown.component.html',
  styleUrls: ['./navigation-dropdown.component.sass']
})
export class NavigationDropdownComponent {

  @Input() links: MenuLink[] = [];
  
  constructor() { }

}
