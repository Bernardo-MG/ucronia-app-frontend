import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuLink } from '@app/shared/menu/models/menu-link';

export class ViewNodeFilter {

  constructor(
    private authContainer: AuthContainer
  ) {}

  /**
   * Filter menu links based on permissions.
   * 
   * @param links - The list of menu links to filter.
   * @returns The filtered list of menu links based on permissions.
   */
  public filterNodes(links: AuthMenuLink[]): MenuLink[] {
    return links
      // Only include links the user has permissions for
      .filter(link => this.authContainer.hasPermission(link.resource, 'view'));
  }

}
