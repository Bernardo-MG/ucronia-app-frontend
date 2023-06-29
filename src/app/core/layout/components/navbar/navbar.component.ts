import { Component, Input } from '@angular/core';

@Component({
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

}
