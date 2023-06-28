import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private authService: AuthService
  ) { }


  public getTitle(): string {
    return 'Association App Frontend';
  }

  public getMenu(): Menu[] {
    return [
      {
        title: 'Association', links: [
          {
            title: 'Fees', links: this.filterNodes([
              { title: 'Calendar', path: '/fees/calendar', resource: 'fee', action: 'read' },
              { title: 'List', path: '/fees/list', resource: 'fee', action: 'read' }
            ])
          },
          {
            title: 'Balance', links: this.filterNodes([
              { title: 'Info', path: '/balance', resource: 'balance', action: 'read' }
            ])
          },
          {
            title: 'Members', links: this.filterNodes([
              { title: 'Stats', path: '/members/stats', resource: 'member', action: 'read' },
              { title: 'List', path: '/members/list', resource: 'member', action: 'read' }
            ])
          },
          {
            title: 'Transactions', links: this.filterNodes([
              { title: 'Calendar', path: '/transactions/calendar', resource: 'transaction', action: 'read' },
              { title: 'List', path: '/transactions/list', resource: 'transaction', action: 'read' }
            ])
          }
        ]
      },
      {
        title: 'security', links: [
          {
            title: 'Users', links: this.filterNodes([
              { title: 'List', path: '/security/users', resource: 'user', action: 'read' }
            ])
          },
          {
            title: 'Roles', links: this.filterNodes([
              { title: 'List', path: '/security/roles', resource: 'role', action: 'read' }
            ])
          }
        ]
      }
    ];
  }

  private filterNodes(links: MenuLink[]): MenuLink[] {
    const result: MenuLink[] = [];

    links.forEach(link => {
      if ((link.resource) && (link.action) && (this.authService.hasPermission(link.resource, link.action))) {
        result.push(link);
      }
    });

    return result;
  }

}
