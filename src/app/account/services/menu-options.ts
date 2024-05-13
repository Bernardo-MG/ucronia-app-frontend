import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
  settings: {
    title: 'Settings',
    links: [
      new AuthMenuLink('Profile', '/account/profile', 'member'),
      new AuthMenuLink('Password', '/account/password', 'fee')
    ]
  }
};
