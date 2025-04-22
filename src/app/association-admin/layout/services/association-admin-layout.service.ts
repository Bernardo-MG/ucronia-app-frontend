import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/ui';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from './association-admin-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLayoutService {

  private menuLoader;

  private adminMenus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
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

  private loadMenus() {
    this.adminMenus = this.menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS);
  }

}
