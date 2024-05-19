import { Injectable } from '@angular/core';
import { Menu } from '@app/shared/menu/models/menu';
import { MENU_OPTIONS } from './menu-options';

@Injectable({
  providedIn: 'root'
})
export class AccountLayoutService {

  constructor() { }

  /**
   * Get the menus dynamically based on MENU_OPTIONS.
   * 
   * @returns An array of menu objects.
   */
  public getMenus(): Menu[] {
    const menus: Menu[] = [];

    // Iterate through each section in MENU_OPTIONS
    for (const sectionKey of Object.keys(MENU_OPTIONS)) {
      const section = MENU_OPTIONS[sectionKey];
      // Only add the section if it has filtered links
      if (section.links.length > 0) {
        menus.push(new Menu(section.links, section.title));
      }
    }

    return menus;
  }
}
