import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';
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
    this.menus = new MenuLoader().load(ASSOCIATION_MENU_OPTIONS, (links) => nodeFilter.filterNodes(links as AuthMenuLink[]));
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
