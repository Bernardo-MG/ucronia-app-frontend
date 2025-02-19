import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@bernardo-mg/icons';
import { MenuOptions } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Administración',
    links: [
      new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent)
    ]
  }
};
