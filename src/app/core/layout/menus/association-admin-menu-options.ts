import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@app/shared/icons/components/icon-book/icon-book.component';
import { IconCoinsComponent } from '@app/shared/icons/components/icon-coins/icon-coins.component';
import { IconPersonComponent } from '@app/shared/icons/components/icon-person/icon-person.component';
import { IconReceiptComponent } from '@app/shared/icons/components/icon-receipt/icon-receipt.component';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const ASSOCIATION_ADMIN_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Administración',
    links: [
      new AuthMenuLink('Admin. socios', '/association/admin/members', 'member', IconPersonComponent),
      new AuthMenuLink('Gente', '/association/admin/people', 'person', IconPersonComponent),
      new AuthMenuLink('Cuotas', '/association/admin/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Fondos', '/association/admin/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent)
    ]
  }
};
