import { Component, Input } from '@angular/core';

@Component({
  selector: 'navigation-side-menu',
  templateUrl: './navigation-side-menu.component.html',
  styleUrls: ['./navigation-side-menu.component.sass']
})
export class NavigationSideMenuComponent {

  @Input() loggedIn: boolean = false;

  constructor() { }

}
