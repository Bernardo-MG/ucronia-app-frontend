import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';
import { IconBookComponent, IconCalendarComponent, IconPersonComponent, IconReceiptComponent } from 'icons';

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
