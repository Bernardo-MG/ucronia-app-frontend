import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { AuthMenuLink, Menu, MenuLink, ViewMenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS } from '../menus/association-admin-funds-menu-options';
import { ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS } from '../menus/association-admin-library-menu-options';
import { ASSOCIATION_ADMIN_MENU_LINKS } from '../menus/association-admin-menu-links';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from '../menus/association-admin-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLayoutService {

  private nodeFilter;

  private menuLoader;

  constructor(
    authContainer: AuthContainer
  ) {
    this.nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    this.menuLoader = new ViewMenuLoader(authContainer);
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS);
  }

  /**
   * Get the funds menus options.
   * 
   * @returns An array of menu objects.
   */
  public getFundsMenus(): Menu[] {
    return this.menuLoader.load(ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS);
  }

  /**
   * Get the library menus options.
   * 
   * @returns An array of menu objects.
   */
  public getLibraryMenus(): Menu[] {
    return this.menuLoader.load(ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS);
  }

  public getLinks(): MenuLink[] {
    return this.nodeFilter(ASSOCIATION_ADMIN_MENU_LINKS);
  }

}
