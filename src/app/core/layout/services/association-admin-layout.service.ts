import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu, MenuLink, MenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from '../menus/association-admin-menu-options';
import { ASSOCIATION_ADMIN_MENU_LINKS } from '../menus/association-admin-menu-links';
import { ViewNodeFilter } from './view-node-filter';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLayoutService {

  private menus: Menu[] = [];

  private links: MenuLink[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = new ViewNodeFilter(authContainer);
    this.menus = new MenuLoader().load(ASSOCIATION_ADMIN_MENU_OPTIONS, (links) => nodeFilter.filterNodes(links as AuthMenuLink[]));
    this.links = nodeFilter.filterNodes(ASSOCIATION_ADMIN_MENU_LINKS);
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.menus;
  }

  public getLinks(): MenuLink[] {
    return this.links;
  }

}
