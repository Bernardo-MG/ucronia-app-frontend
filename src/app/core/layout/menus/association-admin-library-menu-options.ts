import { AuthMenuLink } from '@app/core/layout/model/auth-menu-link';
import { IconBookComponent } from '@bernardo-mg/icons';
import { MenuOptions } from '@bernardo-mg/layout';

// Define menu options with titles for each section
export const ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS: MenuOptions = {
  association: {
    title: 'Administración',
    links: [
      new AuthMenuLink('Biblioteca', '/association/admin/library', 'library', IconBookComponent),
      new AuthMenuLink('Libros', '/association/admin/library/books', 'library_book', IconBookComponent),
      new AuthMenuLink('Autores', '/association/admin/library/authors', 'library_author', IconBookComponent),
      new AuthMenuLink('Editores', '/association/admin/library/publishers', 'library_publisher', IconBookComponent),
      new AuthMenuLink('Tipos', '/association/admin/library/types', 'library_book_type', IconBookComponent),
      new AuthMenuLink('Sistemas', '/association/admin/library/systems', 'library_game_system', IconBookComponent)
    ]
  }
};
