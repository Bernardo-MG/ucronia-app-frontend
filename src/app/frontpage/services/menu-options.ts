import { IconCalendarComponent } from '@app/shared/icons/components/icon-calendar/icon-calendar.component';
import { IconMailComponent } from '@app/shared/icons/components/icon-mail/icon-mail.component';
import { MenuLink } from '@app/shared/menu/models/menu-link';
import { MenuOptions } from '@app/shared/menu/models/menu-options';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  association: {
    title: '',
    links: [
      new MenuLink('Actividades', '/activities', IconCalendarComponent),
      new MenuLink('Contacto', '/contact', IconMailComponent)
    ]
  }
};
