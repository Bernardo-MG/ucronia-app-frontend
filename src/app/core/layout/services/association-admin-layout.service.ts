import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from './association-admin-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLayoutService {

  private menus: Menu[] = [];

  constructor(
    private authContainer: AuthContainer
  ) {
    this.menus = new MenuLoader().load(ASSOCIATION_ADMIN_MENU_OPTIONS, (links) => this.filterNodes(links as AuthMenuLink[]));
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.menus;
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
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'));
  }

}
