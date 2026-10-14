import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { librarySettingsOptions } from '../library-settings-permissions';

@Component({
  selector: 'assoc-library-settings-layout',
  imports: [RouterModule, CardModule, RippleModule],
  templateUrl: './library-settings-layout.html',
  styleUrl: './library-settings-layout.scss'
})
export class LibrarySettingsLayout {

  private readonly authService = inject(AuthService);

  protected readonly options = librarySettingsOptions.filter(option => this.authService.hasPermission(option.permission));
  protected readonly showLibraryLink = this.authService.hasPermission(UcroniaPermissions.library.book.read);

}
