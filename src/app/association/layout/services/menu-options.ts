import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconPersonComponent } from '@app/shared/icons/components/icon-person/icon-person.component';

// Define menu options with titles for each section
export const MENU_OPTIONS: { [key: string]: { title: string, links: AuthMenuLink[] } } = {
  association: {
    title: 'Association',
    links: [
      new AuthMenuLink('Members', '/members', 'member', IconPersonComponent),
      new AuthMenuLink('Fees', '/fees', 'fee'),
      new AuthMenuLink('Funds', '/funds', 'funds'),
      new AuthMenuLink('Library', '/library', 'library'),
      new AuthMenuLink('My fees', '/myFees', 'user_fee')
    ]
  }
};
