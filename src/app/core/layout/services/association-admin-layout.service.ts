import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { AuthMenuLink, Menu, MenuLink, ViewMenuLoader } from '@bernardo-mg/ui';
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

  private adminLinks: MenuLink[] = [];

  private adminMenus: Menu[] = [];

  private fundsMenus: Menu[] = [];

  private libraryMenus: Menu[] = [];

  private links: MenuLink[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    this.nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    this.menuLoader = new ViewMenuLoader(authContainer);

    this.loadMenus();
    // If the user changes, reload menus
    authContainer.securityDetails.subscribe(u => { this.loadMenus() });
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.adminMenus;
  }

  /**
   * Get the funds menus options.
   * 
   * @returns An array of menu objects.
   */
  public getFundsMenus(): Menu[] {
    return this.fundsMenus;
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
    return this.adminLinks;
  }

  private loadMenus() {
    this.adminLinks = this.nodeFilter(ASSOCIATION_ADMIN_MENU_LINKS);
    this.adminMenus = this.menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS);
    this.fundsMenus = this.menuLoader.load(ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS);
    this.libraryMenus = this.menuLoader.load(ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS);
    return this.links;
  }

}
