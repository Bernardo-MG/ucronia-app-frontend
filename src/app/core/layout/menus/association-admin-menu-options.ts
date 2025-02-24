import { IconBookComponent, IconCoinsComponent, IconPersonComponent, IconReceiptComponent } from '@bernardo-mg/icons';
import { AuthMenuLink, MenuOptions } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_ADMIN_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Administración',
    links: [
      new AuthMenuLink('Gente', '/association/admin/people', 'person', IconPersonComponent),
      new AuthMenuLink('Cuotas', '/association/admin/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Fondos', '/association/admin/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent)
    ]
  }
};
