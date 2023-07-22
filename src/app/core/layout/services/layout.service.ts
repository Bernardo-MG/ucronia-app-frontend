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

  public getMenus(): Menu[] {
    const menus = [];

    const associationLinks = this.filterNodes([
      { title: 'Stats', path: '/', resource: 'member', action: 'read' },
      { title: 'Fees', path: '/fees', resource: 'fee', action: 'read' },
      { title: 'Members', path: '/members/list', resource: 'member', action: 'read' },
      { title: 'Transactions', path: '/transactions', resource: 'transaction', action: 'read' }
    ]);

    if (associationLinks.length > 0) {
      menus.push({ title: 'Association', links: associationLinks });
    }

    const securityLinks = this.filterNodes([
      { title: 'Users', path: '/security/users', resource: 'user', action: 'read' },
      { title: 'Roles', path: '/security/roles', resource: 'role', action: 'read' }
    ]);

    if (securityLinks.length > 0) {
      menus.push({ title: 'Security', links: securityLinks });
    }

    return menus;
  }

  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only links the user has permissions for
      .filter(link => this.authService.hasPermission(link.resource, link.action));
  }

}
