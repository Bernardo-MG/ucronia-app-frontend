import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';

@Component({
  selector: 'assoc-library-frontpage',
  standalone: true,
  imports: [RouterModule, LibraryBookListComponent, ArticleComponent],
  templateUrl: './library-frontpage.component.html'
})
export class LibraryFrontpageComponent {

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
