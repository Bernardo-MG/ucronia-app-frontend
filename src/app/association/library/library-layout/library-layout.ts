import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

interface MenuSection {
  label: string;
  items: MenuItem[];
}

@Component({
  selector: 'assoc-library-layout',
  imports: [RouterModule, RippleModule],
  templateUrl: './library-layout.html',
  styleUrl: './library-layout.scss'
})
export class LibraryLayout {

  protected readonly menuSections: MenuSection[];

  constructor() {
    const authService = inject(AuthService);
    const catalogItems: MenuItem[] = [];

    if (authService.hasPermission(UcroniaPermissions.library.author.read)) {
      catalogItems.push({ label: 'Autores', icon: 'pi pi-users', routerLink: 'authors' });
    }
    if (authService.hasPermission(UcroniaPermissions.library.publisher.read)) {
      catalogItems.push({ label: 'Editoriales', icon: 'pi pi-building', routerLink: 'publishers' });
    }
    if (authService.hasPermission(UcroniaPermissions.library.type.read)) {
      catalogItems.push({ label: 'Tipos de libro', icon: 'pi pi-tags', routerLink: 'types' });
    }
    if (authService.hasPermission(UcroniaPermissions.library.system.read)) {
      catalogItems.push({ label: 'Sistemas de juego', icon: 'pi pi-sitemap', routerLink: 'systems' });
    }

    this.menuSections = [
      {
        label: 'Colección',
        items: [{ label: 'Libros', icon: 'pi pi-book', routerLink: 'books' }]
      },
      ...(catalogItems.length > 0 ? [{ label: 'Datos del catálogo', items: catalogItems }] : [])
    ];
  }
}
