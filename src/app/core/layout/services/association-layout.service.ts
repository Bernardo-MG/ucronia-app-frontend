import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationLayoutService {

  private menus: Menu[] = [];

  private menuLoader;

  constructor(
    authContainer: AuthContainer
  ) {
    this.menuLoader = new ViewMenuLoader(authContainer);
    this.menus = new ViewMenuLoader(authContainer).load(ASSOCIATION_MENU_OPTIONS);

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
    return this.menus;
  }

  private loadMenus() {
    this.menus = this.menuLoader.load(ASSOCIATION_MENU_OPTIONS);
  }

}
