import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  settings: {
    title: 'Settings',
    links: [
      new AuthMenuLink('Profile', '/account/profile', 'member'),
      new AuthMenuLink('Password', '/account/password', 'fee')
    ]
  }
};
