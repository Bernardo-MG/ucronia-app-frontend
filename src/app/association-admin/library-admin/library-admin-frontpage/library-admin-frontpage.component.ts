import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { LibraryAdminAuthorListComponent } from '../author/components/library-admin-author-list/library-admin-author-list.component';
import { LibraryAdminBookTypeListComponent } from '../book-type/components/library-admin-book-type-list/library-admin-book-type-list.component';
import { LibraryAdminBookListContainer } from '../book/containers/library-admin-book-list/library-admin-book-list.container';
import { LibraryAdminGameSystemListComponent } from '../game-system/components/library-admin-game-system-list/library-admin-game-system-list.component';
import { LibraryAdminPublisherListComponent } from '../publisher/library-admin-publisher-list/library-admin-publisher-list.component';

@Component({
  selector: 'assoc-library-admin-frontpage',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, CardModule, LibraryAdminBookListContainer, LibraryAdminBookTypeListComponent, LibraryAdminGameSystemListComponent, LibraryAdminAuthorListComponent, LibraryAdminPublisherListComponent, ArticleComponent, JustifyCenterDirective],
  templateUrl: './library-admin-frontpage.component.html'
})
export class LibraryAdminFrontpageComponent implements OnInit {

  public view = 'books';

  public createBookPermission = false;

  public createBookTypePermission = false;

  public createGameSystemPermission = false;

  public createAuthorPermission = false;

  public createPublisherPermission = false;

  public createDonorPermission = false;

  public tabs = [
    new CardTab('books', 'Libros'), new CardTab('authors', 'Autores'), new CardTab('publishers', 'Editores'),
    new CardTab('book_types', 'Tipos'), new CardTab('game_systems', 'Sistemas')
  ];

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

  public onChangeView(newView = 'books') {
    this.view = newView;
  }

}
