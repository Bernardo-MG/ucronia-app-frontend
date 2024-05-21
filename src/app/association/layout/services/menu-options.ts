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
    title: 'Association',
    links: [
      new AuthMenuLink('Calendar', '/calendar', 'activity_calendar', IconCalendarComponent),
      new AuthMenuLink('Members', '/members', 'member', IconPersonComponent),
      new AuthMenuLink('Fees', '/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Funds', '/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Library', '/library', 'library', IconBookComponent),
      new AuthMenuLink('My fees', '/myFees', 'user_fee', IconReceiptComponent)
    ]
  }
};
