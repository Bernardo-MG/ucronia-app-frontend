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
        title: 'Association', links:
          this.filterNodes([
            { title: 'Fees calendar', path: '/fees/calendar', resource: 'fee', action: 'read' },
            { title: 'Member stats', path: '/members/stats', resource: 'member', action: 'read' },
            { title: 'Balance', path: '/balance', resource: 'balance', action: 'read' },
            { title: 'Fees', path: '/fees/list', resource: 'fee', action: 'read' },
            { title: 'Members', path: '/members/list', resource: 'member', action: 'read' },
            { title: 'Transaction calendar', path: '/transactions/calendar', resource: 'transaction', action: 'read' },
            { title: 'Transactions', path: '/transactions/list', resource: 'transaction', action: 'read' }
          ])
      },
      {
        title: 'Security', links: this.filterNodes([
          { title: 'Users', path: '/security/users', resource: 'user', action: 'read' },
          { title: 'Roles', path: '/security/roles', resource: 'role', action: 'read' }
        ])
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
