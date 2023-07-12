import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/shared/menu/models/auth-menu-link';
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

  public getMainMenu(): Menu[] {
    return [
      {
        title: 'Association', links:
          this.filterNodes([
            { title: 'Stats', path: '/', resource: 'member', action: 'read' },
            { title: 'Fees calendar', path: '/fees/calendar', resource: 'fee', action: 'read' },
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

  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only links the user has permissions for
      .filter(link => this.authService.hasPermission(link.resource, link.action));
  }

}
