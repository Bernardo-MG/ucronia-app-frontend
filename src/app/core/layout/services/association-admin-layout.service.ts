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

  private menus: Menu[] = [];

  private links: MenuLink[] = [];

  private feeMenus: Menu[] = [];

  private libraryMenus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    const menuLoader = new ViewMenuLoader(authContainer);
    this.menus = menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS);
    this.links = nodeFilter(ASSOCIATION_ADMIN_MENU_LINKS);
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
