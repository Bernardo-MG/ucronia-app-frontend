import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryAuthorListComponent } from '../library-author-list/library-author-list.component';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';
import { LibraryBookTypeListComponent } from '../library-book-type-list/library-book-type-list.component';
import { LibraryGameSystemListComponent } from '../library-game-system-list/library-game-system-list.component';
import { LibraryPublisherListComponent } from '../library-publisher-list/library-publisher-list.component';

@Component({
  selector: 'assoc-library-admin-frontpage',
  standalone: true,
  imports: [RouterModule, LibraryBookListComponent, LibraryBookTypeListComponent, LibraryGameSystemListComponent, LibraryAuthorListComponent, LibraryPublisherListComponent, ArticleComponent],
  templateUrl: './library-admin-frontpage.component.html'
})
export class LibraryAdminFrontpageComponent {

  public createBookPermission = false;

  public createBookTypePermission = false;

  public createGameSystemPermission = false;

  public createAuthorPermission = false;

  public createPublisherPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createBookPermission = this.authContainer.hasPermission("library_book", "create");
    this.createBookTypePermission = this.authContainer.hasPermission("library_book_type", "create");
    this.createGameSystemPermission = this.authContainer.hasPermission("library_game_system", "create");
    this.createAuthorPermission = this.authContainer.hasPermission("library_author", "create");
    this.createPublisherPermission = this.authContainer.hasPermission("library_publisher", "create");
  }

}
