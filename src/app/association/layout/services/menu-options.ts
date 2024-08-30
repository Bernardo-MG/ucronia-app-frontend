import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@app/shared/icons/components/icon-book/icon-book.component';
import { IconCalendarComponent } from '@app/shared/icons/components/icon-calendar/icon-calendar.component';
import { IconCoinsComponent } from '@app/shared/icons/components/icon-coins/icon-coins.component';
import { IconPersonComponent } from '@app/shared/icons/components/icon-person/icon-person.component';
import { IconReceiptComponent } from '@app/shared/icons/components/icon-receipt/icon-receipt.component';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Asociación',
    links: [
      new AuthMenuLink('Calendario', '/calendar', 'activity_calendar', IconCalendarComponent),
      new AuthMenuLink('Socios', '/members', 'public_member', IconPersonComponent),
      new AuthMenuLink('Admin. socios', '/members/admin', 'member', IconPersonComponent),
      new AuthMenuLink('Cuotas', '/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Mis cuotas', '/myFees', 'my_fees', IconReceiptComponent),
      new AuthMenuLink('Fondos', '/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Biblioteca', '/library', 'library', IconBookComponent)
    ]
  }
};
