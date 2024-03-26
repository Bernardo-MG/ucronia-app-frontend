import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';

export const MENU_OPTIONS: { [key: string]: AuthMenuLink[] } = {
  association: [
    { title: 'Members', path: '/members', resource: 'member' },
    { title: 'Fees', path: '/fees', resource: 'fee' },
    { title: 'Funds', path: '/funds', resource: 'funds' },
    { title: 'Library', path: '/library', resource: 'library' },
    { title: 'Configuration', path: '/configuration', resource: 'association_configuration' }
  ],
  security: [
    { title: 'Users', path: '/users', resource: 'user' },
    { title: 'Roles', path: '/roles', resource: 'role' },
    { title: 'User tokens', path: '/user-tokens', resource: 'user_token' }
  ]
};
