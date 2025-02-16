import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';
import { Menu } from '@bernardo-mg/layout';
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
