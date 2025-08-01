import { Injectable, inject } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { AuthMenuLink, MenuLink } from '@bernardo-mg/ui';
import { LAYOUT_MENU_LINKS } from './layout-menu-links';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private authContainer = inject(AuthContainer);

  private nodeFilter;

  private adminLinks: MenuLink[] = [];

  private showSettingsLinkFlag = false;

  private showSecurityLinkFlag = false;

  private showAssociationLinkFlag = false;

  constructor() {
    const authContainer = this.authContainer;

    this.loadPermissions();
    // If the user changes, reload permissions
    authContainer.securityDetails.subscribe(u => { this.loadPermissions() });
    this.nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));

    this.loadMenus();
    // If the user changes, reload menus
    authContainer.securityDetails.subscribe(u => { this.loadMenus() });
  }

  /**
   * Get the title for the layout.
   * 
   * @returns The title for the layout.
   */
  public getTitle(): string {
    return 'AR Ucronía';
  }

  public getLinks(): MenuLink[] {
    return this.adminLinks;
  }

  public showSettingsLink(): boolean {
    return this.showSettingsLinkFlag;
  }

  public showSecurityLink(): boolean {
    return this.showSecurityLinkFlag;
  }

  public showAssociationLink(): boolean {
    return this.showAssociationLinkFlag;
  }

  private loadPermissions() {
    this.showSettingsLinkFlag = this.authContainer.hasPermission('association_settings', 'view');
    this.showSecurityLinkFlag = this.authContainer.hasPermission('security', 'view');
    this.showAssociationLinkFlag = true;
  }

  private loadMenus() {
    this.adminLinks = this.nodeFilter(LAYOUT_MENU_LINKS);
  }

}
