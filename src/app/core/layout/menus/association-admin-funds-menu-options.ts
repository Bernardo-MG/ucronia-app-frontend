import { IconCoinsComponent, IconReceiptComponent } from '@bernardo-mg/icons';
import { AuthMenuLink, MenuOptions } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_ADMIN_FUNDS_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Administración',
    links: [
      new AuthMenuLink('Cuotas', '/association/admin/money/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Fondos', '/association/admin/money/funds', 'funds', IconCoinsComponent)
    ]
  }
};
