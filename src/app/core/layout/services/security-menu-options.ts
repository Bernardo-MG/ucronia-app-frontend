import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const SECURITY_MENU_OPTIONS: MenuOptions = {
  security: {
    title: 'Seguridad',
    links: [
      new AuthMenuLink('Usuarios', '/security/users', 'user'),
      new AuthMenuLink('Roles', '/security/roles', 'role'),
      new AuthMenuLink('Tokens de usuario', '/security/user-tokens', 'user_token'),
      new AuthMenuLink('Auditoría', '/security/audit', 'user')
    ]
  }
};
