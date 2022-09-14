import { Component } from '@angular/core';
import { Menu } from './navigation/model/menu';
import { MenuLink } from './navigation/model/menu-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'association-app-frontend';

  menus: Menu[] = [{ name: 'admin', links: [{ name: 'admin', path: '/admin' }] }, { name: "data", links: [{ name: 'members', path: '/members' }, { name: 'fees', path: '/fees' }, { name: 'transactions', path: '/transactions' }] }];

}
