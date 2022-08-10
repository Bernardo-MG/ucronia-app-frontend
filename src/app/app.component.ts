import { Component } from '@angular/core';
import { MenuLink } from './navigation/model/menu-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  title = 'association-app-frontend';

  adminLinks: MenuLink[] = [{ name: 'members', path: '/admin/member' }];

  links: MenuLink[] = [{ name: 'members', path: '/members' }];

}
