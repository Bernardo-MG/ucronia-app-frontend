import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  security: {
    title: 'Security',
    links: [
      new AuthMenuLink('Users', '/security/users', 'user'),
      new AuthMenuLink('Roles', '/security/roles', 'role'),
      new AuthMenuLink('User tokens', '/security/user-tokens', 'user_token'),
      new AuthMenuLink('Audit', '/security/audit', 'user')
    ]
  }
};
