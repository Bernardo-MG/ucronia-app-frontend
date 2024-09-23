import { Injectable } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';

/**
 * Service responsible for managing layout-related functionality, such as retrieving menu options.
 */
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private authContainer: AuthContainer
  ) { }

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

}
