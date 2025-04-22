import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/ui';
import { ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS } from './association-admin-funds-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminFeesLayoutService {

  private menuLoader;

  private fundsMenus: Menu[] = [];

  constructor(
    authContainer: AuthContainer
  ) {
    this.menuLoader = new ViewMenuLoader(authContainer);

    this.loadMenus();
    // If the user changes, reload menus
    authContainer.securityDetails.subscribe(u => { this.loadMenus() });
  }

  /**
   * Get the funds menus options.
   * 
   * @returns An array of menu objects.
   */
  public getFundsMenus(): Menu[] {
    return this.fundsMenus;
  }

  private loadMenus() {
    this.fundsMenus = this.menuLoader.load(ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS);
  }

}
