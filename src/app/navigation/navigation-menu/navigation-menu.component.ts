import { Component, Input } from '@angular/core';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.sass']
})
export class NavigationMenuComponent {

  @Input() title: String = '';

  @Input() loggedIn: boolean = false;

  constructor() { }

}
