import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';
import { LibraryBookTypeListComponent } from '../library-book-type-list/library-book-type-list.component';
import { LibraryGameSystemListComponent } from '../library-game-system-list/library-game-system-list.component';
import { LibraryAuthorListComponent } from '../library-author-list/library-author-list.component';
import { LibraryPublisherListComponent } from '../library-publisher-list/library-publisher-list.component';

@Component({
  selector: 'assoc-library-frontpage',
  standalone: true,
  imports: [RouterModule, LayoutModule, LibraryBookListComponent, LibraryBookTypeListComponent, LibraryGameSystemListComponent, LibraryAuthorListComponent, LibraryPublisherListComponent],
  templateUrl: './library-frontpage.component.html'
})
export class LibraryFrontpageComponent {

  public createBookPermission = false;

  public createBookTypePermission = false;

  public createGameSystemPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createBookPermission = this.authContainer.hasPermission("library_book", "create");
    this.createBookTypePermission = this.authContainer.hasPermission("library_book_type", "create");
    this.createGameSystemPermission = this.authContainer.hasPermission("library_game_system", "create");
  }

}
