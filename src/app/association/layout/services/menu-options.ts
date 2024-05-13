import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@app/shared/icons/components/icon-book/icon-book.component';
import { IconCoinsComponent } from '@app/shared/icons/components/icon-coins/icon-coins.component';
import { IconPersonComponent } from '@app/shared/icons/components/icon-person/icon-person.component';
import { IconReceiptComponent } from '@app/shared/icons/components/icon-receipt/icon-receipt.component';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
  association: {
    title: 'Association',
    links: [
      new AuthMenuLink('Members', '/members', 'member', IconPersonComponent),
      new AuthMenuLink('Fees', '/fees', 'fee', IconReceiptComponent),
      new AuthMenuLink('Funds', '/funds', 'funds', IconCoinsComponent),
      new AuthMenuLink('Library', '/library', 'library', IconBookComponent),
      new AuthMenuLink('My fees', '/myFees', 'user_fee', IconReceiptComponent)
    ]
  }
};
