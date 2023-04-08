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
            { title: 'Calendar', path: '/fees/calendar' },
            { title: 'List', path: '/fees/list' },
            { title: 'Create', path: '/fees/create' }
          ]
        },
        {
          title: 'Balance', links: [
            { title: 'Info', path: '/balance' }
          ]
        },
        {
          title: 'Members', links: [
            { title: 'Stats', path: '/members/stats' },
            { title: 'List', path: '/members/list' },
            { title: 'Create', path: '/members/create' }
          ]
        },
        {
          title: 'Transactions', links: [
            { title: 'Calendar', path: '/transactions/calendar' },
            { title: 'List', path: '/transactions/list' },
            { title: 'Create', path: '/transactions/create' }
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
