import { Component } from '@angular/core';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'layout-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.sass']
})
export class MainFrameComponent {

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
