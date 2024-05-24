import { Injectable } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';
import { MENU_OPTIONS } from './menu-options';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';

@Injectable({
  providedIn: 'root'
})
export class AccountLayoutService {

  private menus: Menu[] = [];

  constructor() {
    this.menus = new MenuLoader().load(MENU_OPTIONS);
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
