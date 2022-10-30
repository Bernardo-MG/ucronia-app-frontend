import { Component, Input } from '@angular/core';
import { AuthenticationContainer } from '@app/authentication/service/authentication-container.service';
import { Menu } from '../model/menu';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.sass']
})
export class NavigationMenuComponent {

  @Input() menus: Menu[] = [];

  @Input() title: String = '';

  public loggedIn: boolean = false;

  constructor(
    private authenticationContainer: AuthenticationContainer
  ) {
    this.authenticationContainer.getUserObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
