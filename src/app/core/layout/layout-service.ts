import { Injectable, inject } from '@angular/core';
import { AuthContainer } from '@bernardo-mg/authentication';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private authContainer = inject(AuthContainer);

  private showSettingsLinkFlag = false;

  private showSecurityLinkFlag = false;

  constructor() {
    const authContainer = this.authContainer;

    this.loadPermissions();
    // If the user changes, reload permissions
    authContainer.securityDetails
      .subscribe(u => this.loadPermissions());
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

  private loadPermissions() {
    this.showSettingsLinkFlag = this.authContainer.hasPermission('association_settings', 'view');
    this.showSecurityLinkFlag = this.authContainer.hasPermission('security', 'view');
  }

}
