import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@app/shared/icons/components/icon-book/icon-book.component';
import { IconPersonComponent } from '@app/shared/icons/components/icon-person/icon-person.component';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const ADMIN_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Asociación',
    links: [
      new AuthMenuLink('Admin. socios', '/association/admin/members', 'member', IconPersonComponent),
      new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent)
    ]
  }
};
