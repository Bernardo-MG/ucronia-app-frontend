import { Component } from '@angular/core';
import { Menu } from './navigation/model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'association-app-frontend';

  menus: Menu[] = [
    // Admin links
    {
      name: 'admin', links: [{ name: 'admin', path: '/admin' }
        , { name: 'roles', path: '/security/roles' }, { name: 'users', path: '/security/users' }]
    },
    // Data links
    {
      name: "data", links: [{ name: 'members', path: '/members' }, { name: 'fees', path: '/fees' }, { name: 'transactions', path: '/transactions' }]
    }];

}
