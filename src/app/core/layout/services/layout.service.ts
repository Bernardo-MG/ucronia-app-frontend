import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuLink, MenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from '../menus/association-admin-menu-options';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';
import { AuthMenuLink } from '../model/auth-menu-link';

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
    const nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    this.menuLoader = new MenuLoader(nodeFilter);
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
