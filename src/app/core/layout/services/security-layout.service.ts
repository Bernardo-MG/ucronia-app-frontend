import { Injectable } from '@angular/core';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, MenuLoader } from '@bernardo-mg/layout';
import { SECURITY_MENU_OPTIONS } from '../menus/security-menu-options';
import { ViewNodeFilter } from './view-node-filter';

@Injectable({
  providedIn: 'root'
})
export class SecurityLayoutService {

  private menus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = new ViewNodeFilter(authContainer);
    this.menus = new MenuLoader().load(SECURITY_MENU_OPTIONS, (links) => nodeFilter.filterNodes(links as AuthMenuLink[]));
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
