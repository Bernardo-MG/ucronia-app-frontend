import { Component } from '@angular/core';
import { Menu } from '@app/core/models/menu';

@Component({
  selector: 'view-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent {

  public title = 'Association App Frontend';

  public menus: Menu[] = [
    {
      title: 'Association', links: [
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
