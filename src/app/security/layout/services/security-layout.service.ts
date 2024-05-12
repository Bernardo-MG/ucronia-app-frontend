import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MENU_OPTIONS } from './menu-options';

@Injectable({
  providedIn: 'root'
})
export class SecurityLayoutService {

  constructor(
    private authContainer: AuthContainer
  ) { }

  /**
   * Get the menus dynamically based on MENU_OPTIONS.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    const menus: Menu[] = [];

    // Iterate through each section in MENU_OPTIONS
    for (const sectionKey of Object.keys(MENU_OPTIONS)) {
      const section = MENU_OPTIONS[sectionKey];
      const filteredLinks = this.filterNodes(section.links);
      // Only add the section if it has filtered links
      if (filteredLinks.length > 0) {
        menus.push({ title: section.title, links: filteredLinks });
      }
    }

    return menus;
  }

  /**
   * Filter menu links based on permissions.
   * 
   * @param links - The list of menu links to filter.
   * @returns The filtered list of menu links based on permissions.
   */
  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only include links the user has permissions for
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'))
      // Map to MenuLink objects
      .map(link => ({ title: link.title, path: link.path }));
  }

}
