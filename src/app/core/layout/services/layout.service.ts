import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
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
    return 'AR Ucronía';
  }

  public getMenus(): Menu[] {
    const menus = [];

    const associationLinks = this.filterNodes([
      { title: 'Stats', path: '/', resource: 'member' },
      { title: 'Fees', path: '/fees', resource: 'fee' },
      { title: 'Members', path: '/members', resource: 'member' },
      { title: 'Transactions', path: '/transactions', resource: 'transaction' },
      { title: 'Configuration', path: '/configuration', resource: 'association_configuration' }
    ]);

    if (associationLinks.length > 0) {
      menus.push({ title: 'Association', links: associationLinks });
    }

    const securityLinks = this.filterNodes([
      { title: 'Users', path: '/users', resource: 'user' },
      { title: 'Roles', path: '/roles', resource: 'role' }
    ]);

    if (securityLinks.length > 0) {
      menus.push({ title: 'Security', links: securityLinks });
    }

    return menus;
  }

  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only links the user has permissions for
      .filter(link => this.authService.hasPermission(link.resource, 'view'));
  }

}
