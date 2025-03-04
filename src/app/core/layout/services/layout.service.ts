import { Injectable } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ViewMenuLoader } from '@bernardo-mg/layout';
import { ASSOCIATION_MENU_OPTIONS } from '../menus/association-menu-options';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private menuLoader: ViewMenuLoader;

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

}
