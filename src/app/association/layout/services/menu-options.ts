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
      new AuthMenuLink('Calendario', '/association/calendar', 'activity_calendar', IconCalendarComponent),
      new AuthMenuLink('Socios', '/association/members', 'public_member', IconPersonComponent),
      new AuthMenuLink('Cuotas', '/association/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Mis cuotas', '/association/myFees', 'my_fees', IconReceiptComponent),
      new AuthMenuLink('Fondos', '/association/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Biblioteca', '/association/library', 'library', IconBookComponent)
    ]
  }
};
