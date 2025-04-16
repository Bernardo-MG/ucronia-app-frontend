import { Injectable } from '@angular/core';
import { Menu, MenuLoader } from '@bernardo-mg/layout';
import { MENU_OPTIONS } from './menu-options';

@Injectable({
  providedIn: 'root'
})
export class AccountLayoutService {

  private readonly menus: Menu[] = [];

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
