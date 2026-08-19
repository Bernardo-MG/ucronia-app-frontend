import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'assoc-settings-layout',
  imports: [RouterModule],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss'
})
export class SettingsLayout {

  protected readonly menuItems: MenuItem[];

  constructor() {
    const authService = inject(AuthService);

    this.menuItems = [
      {
        label: 'Propiedades',
        icon: 'pi pi-sliders-h',
        routerLink: 'properties'
      },
      ...(authService.hasPermission(UcroniaPermissions.feeType.read)
        ? [{
          label: 'Tipos de cuota',
          icon: 'pi pi-money-bill',
          routerLink: 'fee-types'
        }]
        : []),
      ...(authService.hasPermission(
        UcroniaPermissions.directory.memberProfile.read
      )
        ? [{
          label: 'Llaves',
          icon: 'pi pi-key',
          routerLink: 'keys'
        }]
        : []),
      ...(authService.hasPermission(
        UcroniaPermissions.directory.contactMethod.read
      )
        ? [{
          label: 'Métodos de contacto',
          icon: 'pi pi-phone',
          routerLink: 'contact-methods'
        }]
        : [])
    ];
  }
}