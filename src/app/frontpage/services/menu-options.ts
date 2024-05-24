import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Association',
    links: [
      new MenuLink('Activities', '/activities'),
      new MenuLink('Location', '/location')
    ]
  }
};
