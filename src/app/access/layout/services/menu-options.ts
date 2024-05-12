import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
  security: {
    title: 'Security',
    links: [
      { title: 'Users', path: '/users', resource: 'user' },
      { title: 'Roles', path: '/roles', resource: 'role' },
      { title: 'User tokens', path: '/user-tokens', resource: 'user_token' },
      { title: 'Audit', path: '/security/audit', resource: 'user' }
    ]
  }
};
