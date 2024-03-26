import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private authContainer: AuthContainer
  ) { }

  /**
   * Retrieves the title of the application.
   * 
   * @returns The title of the application.
   */
  public getTitle(): string {
    return 'AR Ucronía';
  }

  /**
   * Retrieves the menu options for the application.
   * 
   * @returns An array of menu options.
   */
  public getMenus(): Menu[] {
    const menus: Menu[] = [];

    const associationMenuLinks = this.filterNodes([
      { title: 'Members', path: '/members', resource: 'member' },
      { title: 'Fees', path: '/fees', resource: 'fee' },
      { title: 'Funds', path: '/funds', resource: 'funds' },
      { title: 'Library', path: '/library', resource: 'library' },
      { title: 'Configuration', path: '/configuration', resource: 'association_configuration' }
    ]);

    if (associationMenuLinks.length > 0) {
      menus.push({ title: 'Association', links: associationMenuLinks });
    }

    const securityMenuLinks = this.filterNodes([
      { title: 'Users', path: '/users', resource: 'user' },
      { title: 'Roles', path: '/roles', resource: 'role' },
      { title: 'User tokens', path: '/user-tokens', resource: 'user_token' }
    ]);

    if (securityMenuLinks.length > 0) {
      menus.push({ title: 'Security', links: securityMenuLinks });
    }

    return menus;
  }

  /**
   * Filters the menu links based on user permissions.
   * 
   * @param links The menu links to filter.
   * @returns An array of filtered menu links.
   */
  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only links the user has permissions for
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'))
      // Map to MenuLink objects
      .map(link => ({ title: link.title, path: link.path }));
  }

}
