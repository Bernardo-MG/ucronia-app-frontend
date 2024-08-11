import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  settings: {
    title: 'Settings',
    links: [
      new AuthMenuLink('Perfil', '/account/profile', 'member'),
      new AuthMenuLink('Contraseña', '/account/password', 'member')
    ]
  }
};
