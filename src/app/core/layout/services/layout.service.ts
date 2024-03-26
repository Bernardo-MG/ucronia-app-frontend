import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MENU_OPTIONS } from './menu-options';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private authContainer: AuthContainer
  ) { }

  public getTitle(): string {
    return 'AR Ucronía';
  }

  public getMenus(): Menu[] {
    const menus: Menu[] = [];

    if (MENU_OPTIONS['association']) {
      const associationLinks = this.filterNodes(MENU_OPTIONS['association']);
      if (associationLinks.length > 0) {
        menus.push({ title: 'Association', links: associationLinks });
      }
    }

    if (MENU_OPTIONS['security']) {
      const securityLinks = this.filterNodes(MENU_OPTIONS['security']);
      if (securityLinks.length > 0) {
        menus.push({ title: 'Security', links: securityLinks });
      }
    }

    return menus;
  }

  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only links the user has permissions for
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'))
      // Map to MenuLink objects
      .map(link => ({ title: link.title, path: link.path }));
  }

}
