import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuLoader, ViewMenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from '../menus/association-admin-menu-options';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private menuLoader: MenuLoader;

  constructor(
    private authContainer: AuthContainer
  ) {
    this.menuLoader = new ViewMenuLoader(authContainer);
  }

  /**
   * Get the title for the layout.
   * 
   * @returns The title for the layout.
   */
  public getTitle(): string {
    return 'AR Ucronía';
  }

  public showSettingsLink(): boolean {
    return this.authContainer.hasPermission('association_settings', 'view');
  }

  public showSecurityLink(): boolean {
    return this.authContainer.hasPermission('security', 'view');
  }

  public showAssociationLink(): boolean {
    return this.menuLoader.load(ASSOCIATION_MENU_OPTIONS).length > 0;
  }

  public showAssociationAdminLink(): boolean {
    return this.menuLoader.load(ASSOCIATION_ADMIN_MENU_OPTIONS).length > 0;
  }

}
