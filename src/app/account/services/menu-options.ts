import { AuthMenuLink, MenuOptions } from '@bernardo-mg/ui';

// Define menu options with titles for each section
export const MENU_OPTIONS: MenuOptions = {
  settings: {
    title: 'Cuenta',
    links: [
      new AuthMenuLink('Perfil', '/account/profile', 'member'),
      new AuthMenuLink('Contraseña', '/account/password', 'member')
    ]
  }
};
