import { Injectable, inject } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, ViewMenuLoader } from '@bernardo-mg/ui';
import { ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS } from './association-admin-library-menu-options';

@Injectable({
  providedIn: 'root'
})
export class AssociationAdminLibraryLayoutService {

  private menuLoader;

  private libraryMenus: Menu[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    this.menuLoader = new ViewMenuLoader(authContainer);

    this.loadMenus();
    // If the user changes, reload menus
    authContainer.securityDetails.subscribe(u => { this.loadMenus() });
  }

  /**
   * Get the library menus options.
   * 
   * @returns An array of menu objects.
   */
  public getLibraryMenus(): Menu[] {
    return this.libraryMenus;
  }

  private loadMenus() {
    this.libraryMenus = this.menuLoader.load(ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS);
  }

}
