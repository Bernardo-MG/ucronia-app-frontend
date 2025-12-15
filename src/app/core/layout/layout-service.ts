import { Injectable, inject } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private authService = inject(AuthService);

  private showSettingsLinkFlag = false;

  private showSecurityLinkFlag = false;

  constructor() {
    const authService = this.authService;

    this.loadPermissions();
    // If the user changes, reload permissions
    authService.securityDetails
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
    this.showSettingsLinkFlag = this.authService.hasPermission('association_settings', 'view');
    this.showSecurityLinkFlag = this.authService.hasPermission('security', 'view');
  }

}
