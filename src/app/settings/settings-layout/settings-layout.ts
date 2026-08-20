import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

interface MenuSection {
  label: string;
  items: MenuItem[];
}

@Component({
  selector: 'assoc-settings-layout',
  imports: [
    RouterModule,
    CardModule,
    RippleModule
  ],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss'
})
export class SettingsLayout {

  protected readonly menuSections: MenuSection[];

  constructor() {
    const authService = inject(AuthService);

    const catalogItems = this.catalogItems(authService);
    const libraryItems = this.libraryItems(authService);

    this.menuSections = [
      {
        label: 'Configuración',
        items: [
          {
            label: 'Propiedades',
            icon: 'pi pi-sliders-h',
            routerLink: 'properties'
          }
        ]
      },
      ...(catalogItems.length > 0
        ? [{
          label: 'Catálogos',
          items: catalogItems
        }]
        : []),
      ...(libraryItems.length > 0
        ? [{
          label: 'Biblioteca',
          items: libraryItems
        }]
        : [])
    ];
  }

  private catalogItems(authService: AuthService): MenuItem[] {
    const catalogItems: MenuItem[] = [];

    if (authService.hasPermission(UcroniaPermissions.feeType.read)) {
      catalogItems.push({
        label: 'Tipos de cuota',
        icon: 'pi pi-money-bill',
        routerLink: 'fee-types'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.directory.memberProfile.read)
    ) {
      catalogItems.push({
        label: 'Llaves',
        icon: 'pi pi-key',
        routerLink: 'keys'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.directory.contactMethod.read)
    ) {
      catalogItems.push({
        label: 'Métodos de contacto',
        icon: 'pi pi-phone',
        routerLink: 'contact-methods'
      });
    }

    return catalogItems;
  }

  private libraryItems(authService: AuthService): MenuItem[] {
    const libraryItems: MenuItem[] = [];

    if (authService.hasPermission(UcroniaPermissions.library.author.read)) {
      libraryItems.push({
        label: 'Autores',
        icon: 'pi pi-user',
        routerLink: 'library/author'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.library.publisher.read)) {
      libraryItems.push({
        label: 'Editoriales',
        icon: 'pi pi-building',
        routerLink: 'library/publisher'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.library.system.read)) {
      libraryItems.push({
        label: 'Sistemas',
        icon: 'pi pi-cog',
        routerLink: 'library/system'
      });
    }

    if (authService.hasPermission(UcroniaPermissions.library.type.read)) {
      libraryItems.push({
        label: 'Tipos',
        icon: 'pi pi-cog',
        routerLink: 'library/type'
      });
    }

    return libraryItems;
  }

}