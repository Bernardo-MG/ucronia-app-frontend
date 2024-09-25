import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MenuLoader } from '@app/shared/menu/utils/menu-loader';
import { AuthMenuLink } from '../model/auth-menu-link';
import { ASSOCIATION_ADMIN_MENU_OPTIONS } from './association-admin-menu-options';
import { ASSOCIATION_MENU_OPTIONS } from './association-menu-options';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private authContainer: AuthContainer
  ) {}

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
    return new MenuLoader().load(ASSOCIATION_MENU_OPTIONS, (links) => this.filterNodes(links as AuthMenuLink[])).length > 0;
  }

  public showAssociationAdminLink(): boolean {
    return new MenuLoader().load(ASSOCIATION_ADMIN_MENU_OPTIONS, (links) => this.filterNodes(links as AuthMenuLink[])).length > 0;
  }

  /**
   * Filter menu links based on permissions.
   * 
   * @param links - The list of menu links to filter.
   * @returns The filtered list of menu links based on permissions.
   */
  private filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only include links the user has permissions for
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'));
  }

}
