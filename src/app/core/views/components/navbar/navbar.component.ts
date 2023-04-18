import { Component, Input } from '@angular/core';

@Component({
  selector: 'view-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  @Input() title = '';

  @Input() public loggedIn = false;

}
