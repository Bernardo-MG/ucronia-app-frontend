import { IconBookComponent, IconCoinsComponent, IconPersonComponent } from '@bernardo-mg/icons';
import { AuthMenuLink } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_ADMIN_MENU_LINKS = [
  new AuthMenuLink('Gente', '/association/admin/people', 'person', IconPersonComponent),
  new AuthMenuLink('Fondos', '/association/admin/money', 'funds', IconCoinsComponent),
  new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent)
];
