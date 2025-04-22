import { IconBookComponent } from '@bernardo-mg/icons';
import { AuthMenuLink, MenuOptions } from '@bernardo-mg/ui';

// Define menu options with titles for each section
export const ASSOCIATION_LIBRARY_ADMIN_MENU_OPTIONS: MenuOptions = {
  books: {
    title: 'Libros',
    links: [
      new AuthMenuLink('Libros', '/association/admin/library/books', 'library_book', IconBookComponent)
    ]
  },
  data: {
    title: 'Datos',
    links: [
      new AuthMenuLink('Autores', '/association/admin/library/authors', 'library_author', IconBookComponent),
      new AuthMenuLink('Editores', '/association/admin/library/publishers', 'library_publisher', IconBookComponent),
      new AuthMenuLink('Tipos', '/association/admin/library/types', 'library_book_type', IconBookComponent),
      new AuthMenuLink('Sistemas', '/association/admin/library/systems', 'library_game_system', IconBookComponent),
      new AuthMenuLink('Préstamos', '/association/admin/library/lendings', 'library_lending', IconBookComponent)
    ]
  }
};
