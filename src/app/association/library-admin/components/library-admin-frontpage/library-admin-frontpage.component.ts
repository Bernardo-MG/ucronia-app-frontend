import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryAdminAuthorListComponent } from '../library-admin-author-list/library-admin-author-list.component';
import { LibraryAdminBookListComponent } from '../library-admin-book-list/library-admin-book-list.component';
import { LibraryAdminBookTypeListComponent } from '../library-admin-book-type-list/library-admin-book-type-list.component';
import { LibraryAdminGameSystemListComponent } from '../library-admin-game-system-list/library-admin-game-system-list.component';
import { LibraryAdminPublisherListComponent } from '../library-admin-publisher-list/library-admin-publisher-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'assoc-library-admin-frontpage',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, LibraryAdminBookListComponent, LibraryAdminBookTypeListComponent, LibraryAdminGameSystemListComponent, LibraryAdminAuthorListComponent, LibraryAdminPublisherListComponent, ArticleComponent],
  templateUrl: './library-admin-frontpage.component.html'
})
export class LibraryAdminFrontpageComponent {

  public view: 'books' | 'authors' | 'publishers' | 'book_types' | 'game_systems' = 'books';

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

  public onChangeView(newView: 'books' | 'authors' | 'publishers' | 'book_types' | 'game_systems' = 'books') {
    this.view = newView;
  }

}
