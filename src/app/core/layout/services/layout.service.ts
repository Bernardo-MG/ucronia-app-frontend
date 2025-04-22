import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { AuthMenuLink, MenuLink, ViewMenuLoader } from '@bernardo-mg/ui';
import { ASSOCIATION_MENU_OPTIONS } from '../../../association/layout/services/association-menu-options';
import { LAYOUT_MENU_LINKS } from './layout-menu-links';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private nodeFilter;

  private menuLoader: ViewMenuLoader;

  private adminLinks: MenuLink[] = [];

  private showSettingsLinkFlag = false;

  private showSecurityLinkFlag = false;

  private showAssociationLinkFlag = false;

  constructor(
    private authContainer: AuthContainer
  ) {
    this.menuLoader = new ViewMenuLoader(authContainer);
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
    this.showAssociationLinkFlag = this.menuLoader.load(ASSOCIATION_MENU_OPTIONS).length > 0;
  }

  private loadMenus() {
    this.adminLinks = this.nodeFilter(LAYOUT_MENU_LINKS);
  }

}
