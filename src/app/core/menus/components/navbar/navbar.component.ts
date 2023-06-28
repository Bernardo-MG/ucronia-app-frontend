import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

}
