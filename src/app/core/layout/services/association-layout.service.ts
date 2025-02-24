import { Injectable } from '@angular/core';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, MenuLink, MenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';
import { ViewNodeFilter } from './view-node-filter';

@Injectable({
  providedIn: 'root'
})
export class AssociationLayoutService {

  private menus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = new ViewNodeFilter(authContainer);
    const menuFilter = (links: MenuLink[]) => nodeFilter.filterNodes(links as AuthMenuLink[]);
    this.menus = new MenuLoader(menuFilter).load(ASSOCIATION_MENU_OPTIONS);
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
