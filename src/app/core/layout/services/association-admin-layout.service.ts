import { Injectable } from '@angular/core';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, MenuLink, MenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS } from '../menus/association-admin-funds-menu-options';
import { ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS } from '../menus/association-admin-library-menu-options';
import { ASSOCIATION_ADMIN_MENU_LINKS } from '../menus/association-admin-menu-links';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from '../menus/association-admin-menu-options';
import { ViewNodeFilter } from './view-node-filter';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLayoutService {

  private menus: Menu[] = [];

  private links: MenuLink[] = [];

  private feeMenus: Menu[] = [];

  private libraryMenus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = new ViewNodeFilter(authContainer);
    const menuFilter = (links: MenuLink[]) => nodeFilter.filterNodes(links as AuthMenuLink[]);
    const menuLoader = new MenuLoader(menuFilter);
    this.menus = menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS);
    this.links = nodeFilter.filterNodes(ASSOCIATION_ADMIN_MENU_LINKS);
    this.feeMenus = menuLoader.load(ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS);
    this.libraryMenus = menuLoader.load(ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS);
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
   * Get the funds menus options.
   * 
   * @returns An array of menu objects.
   */
  public getFundsMenus(): Menu[] {
    return this.feeMenus;
  }

  /**
   * Get the library menus options.
   * 
   * @returns An array of menu objects.
   */
  public getLibraryMenus(): Menu[] {
    return this.libraryMenus;
  }

  public getLinks(): MenuLink[] {
    return this.links;
  }

}
