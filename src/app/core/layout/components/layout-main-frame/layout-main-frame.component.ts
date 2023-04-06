import { Component } from '@angular/core';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'layout-main-frame',
  templateUrl: './layout-main-frame.component.html',
  styleUrls: ['./layout-main-frame.component.sass']
})
export class MainFrameLayoutComponent {

  public title = 'Association App Frontend';

  public menus: Menu[] = [
    {
      title: 'Admin', links: [
        { title: 'Fees', path: '/fees' },
        { title: 'Balance', path: '/balance' },
        { title: 'Members', path: '/members' },
        { title: 'Transactions', path: '/transactions' }
      ]
    },
    {
      title: 'security', links: [
        { title: 'Roles', path: '/security/roles' },
        { title: 'Users', path: '/security/users' }
      ]
    }
  ];

}
