import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryAdminAuthorListComponent } from '../author/library-admin-author-list/library-admin-author-list.component';
import { LibraryAdminBookTypeListComponent } from '../book-type/library-admin-book-type-list/library-admin-book-type-list.component';
import { LibraryAdminBookListComponent } from '../book/library-admin-book-list/library-admin-book-list.component';
import { LibraryAdminDonorListComponent } from '../donor/library-admin-donor-list/library-admin-donor-list.component';
import { LibraryAdminGameSystemListComponent } from '../game-system/library-admin-game-system-list/library-admin-game-system-list.component';
import { LibraryAdminPublisherListComponent } from '../publisher/library-admin-publisher-list/library-admin-publisher-list.component';

@Component({
  selector: 'assoc-library-admin-frontpage',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, LibraryAdminBookListComponent, LibraryAdminBookTypeListComponent, LibraryAdminGameSystemListComponent, LibraryAdminAuthorListComponent, LibraryAdminPublisherListComponent, LibraryAdminDonorListComponent, ArticleComponent],
  templateUrl: './library-admin-frontpage.component.html'
})
export class LibraryAdminFrontpageComponent implements OnInit {

  public view: 'books' | 'authors' | 'publishers' | 'book_types' | 'game_systems' | 'donors' = 'books';

  public createBookPermission = false;

  public createBookTypePermission = false;

  public createGameSystemPermission = false;

  public createAuthorPermission = false;

  public createPublisherPermission = false;

  public createDonorPermission = false;

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
    this.createDonorPermission = this.authContainer.hasPermission("inventory_donor", "create");
  }

  public onChangeView(newView: 'books' | 'authors' | 'publishers' | 'book_types' | 'game_systems' | 'donors' = 'books') {
    this.view = newView;
  }

}
