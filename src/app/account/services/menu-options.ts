import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
  settings: {
    title: 'Settings',
    links: [
      { title: 'Profile', path: '/account/profile', resource: 'member' },
      { title: 'Password', path: '/account/password', resource: 'fee' }
    ]
  }
};
