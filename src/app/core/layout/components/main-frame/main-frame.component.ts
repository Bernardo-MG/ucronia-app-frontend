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
        {
          title: 'Fees', links: [
            { title: 'List', path: '/fees' }
          ]
        },
        {
          title: 'Balance', links: [
            { title: 'List', path: '/balance' }
          ]
        },
        {
          title: 'Members', links: [
            { title: 'List', path: '/members' }
          ]
        },
        {
          title: 'Transactions', links: [
            { title: 'List', path: '/transactions' }
          ]
        }
      ]
    },
    {
      title: 'security', links: [
        {
          title: 'Roles', links: [
            { title: 'List', path: '/security/roles' }
          ]
        },
        {
          title: 'Users', links: [
            { title: 'List', path: '/security/users' }
          ]
        }
      ]
    }
  ];

}
