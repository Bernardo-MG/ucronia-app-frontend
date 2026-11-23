import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { CardModule } from '@openng/optimus-ui/card';
import { RippleModule } from '@openng/optimus-ui/ripple';
import { librarySettingsOptions } from '../library-settings-permissions';

@Component({
  selector: 'assoc-library-settings-layout',
  imports: [RouterModule, CardModule, RippleModule],
  templateUrl: './library-settings-layout.html',
  styleUrl: './library-settings-layout.scss'
})
export class LibrarySettingsLayout {

  private readonly authService = inject(AuthService);

  protected readonly options = librarySettingsOptions.filter(option => inject(AuthService).hasPermission(option.permission));
  protected readonly showLibraryLink = inject(AuthService).hasPermission(UcroniaPermissions.library.book.read);

}
