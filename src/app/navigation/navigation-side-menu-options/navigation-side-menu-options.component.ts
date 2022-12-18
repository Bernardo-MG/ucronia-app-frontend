import { Component, Input } from '@angular/core';

@Component({
  selector: 'navigation-side-menu-options',
  templateUrl: './navigation-side-menu-options.component.html',
  styleUrls: ['./navigation-side-menu-options.component.sass']
})
export class NavigationSideMenuOptionsComponent {

  @Input() loggedIn: boolean = false;

  constructor() { }

}
