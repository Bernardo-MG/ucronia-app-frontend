import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationLayoutService {

  private menus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    this.menus = new ViewMenuLoader(authContainer).load(ASSOCIATION_MENU_OPTIONS);
  }

  /**
   * Get the menus options.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    return this.menus;
  }

}
