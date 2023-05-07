import { Injectable } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  public getTitle() : string {
    return 'Association App Frontend';
  }
  
  public getMenu(): Menu[] {
    return [
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
              { title: 'List', path: '/security/roles' },
              { title: 'Create', path: '/security/roles/create' }
            ]
          },
          {
            title: 'Users', links: [
              { title: 'List', path: '/security/users' },
              { title: 'Create', path: '/security/users/create' }
            ]
          }
        ]
      }
    ];
  }

}
