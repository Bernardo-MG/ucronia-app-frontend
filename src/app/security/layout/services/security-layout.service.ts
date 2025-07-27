import { Injectable, inject } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/ui';
import { SECURITY_MENU_OPTIONS } from './security-menu-options';

@Injectable({
  providedIn: 'root'
})
export class SecurityLayoutService {

  private menuLoader;

  private securityMenus: Menu[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    this.menuLoader = new ViewMenuLoader(authContainer);
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
    return this.securityMenus;
  }

  private loadMenus() {
    this.securityMenus = this.menuLoader.load(SECURITY_MENU_OPTIONS);
  }

}
