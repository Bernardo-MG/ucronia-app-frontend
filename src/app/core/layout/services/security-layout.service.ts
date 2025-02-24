import { Injectable } from '@angular/core';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, MenuLink, MenuLoader } from '@bernardo-mg/layout';
import { SECURITY_MENU_OPTIONS } from '../menus/security-menu-options';

@Injectable({
  providedIn: 'root'
})
export class SecurityLayoutService {

  private menus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    const nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    this.menus = new MenuLoader(nodeFilter).load(SECURITY_MENU_OPTIONS);
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
