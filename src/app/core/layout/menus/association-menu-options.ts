import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent, IconCalendarComponent, IconPersonComponent, IconReceiptComponent } from '@bernardo-mg/icons';
import { MenuOptions } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Asociación',
    links: [
      new AuthMenuLink('Calendario', '/association/calendar', 'activity_calendar', IconCalendarComponent),
      new AuthMenuLink('Socios', '/association/members', 'member', IconPersonComponent),
      new AuthMenuLink('Mis cuotas', '/association/myFees', 'my_fees', IconReceiptComponent),
      new AuthMenuLink('Biblioteca', '/association/library', 'library', IconBookComponent)
    ]
  }
};
