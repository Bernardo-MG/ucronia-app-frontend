import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-association-admin-library-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-admin-library-layout.container.html'
})
export class AssociationAdminLibraryLayoutContainer {

  public readonly menus: MenuItem[];

  constructor() {
    const authContainer = inject(AuthContainer);
    const bookItems = [];
    if (authContainer.hasPermission('library_book', 'view')) {
      bookItems.push(
        {
          label: 'Libros',
          routerLink: '/association/admin/library/books',
          icon: 'pi pi-book'
        });
    }

    const dataItems = [];
    if (authContainer.hasPermission('activity_calendar', 'library_author')) {
      dataItems.push(
        {
          label: 'Autores',
          routerLink: '/association/admin/library/authors',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('library_publisher', 'view')) {
      dataItems.push(
        {
          label: 'Editores',
          routerLink: '/association/admin/library/publishers',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('library_book_type', 'view')) {
      dataItems.push(
        {
          label: 'Tipos',
          routerLink: '/association/admin/library/types',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('library_game_system', 'view')) {
      dataItems.push(
        {
          label: 'Sistemas',
          routerLink: '/association/admin/library/systems',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('library_lending', 'view')) {
      dataItems.push(
        {
          label: 'Préstamos',
          routerLink: '/association/admin/library/lendings',
          icon: 'pi pi-users'
        });
    }

    this.menus =
      [
        {
          label: 'Libros',
          items: bookItems
        },
        {
          label: 'Datos',
          items: dataItems
        }
      ]
  }

}
