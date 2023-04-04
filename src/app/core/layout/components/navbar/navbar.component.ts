import { Component, Input } from '@angular/core';

@Component({
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  @Input() title = '';

  @Input() public loggedIn = false;

}
