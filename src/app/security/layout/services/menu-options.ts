import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
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
