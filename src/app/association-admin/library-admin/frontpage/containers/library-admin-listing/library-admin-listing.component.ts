import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookReportService } from '@app/association-admin/library-admin/report/services/book-report.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { LibraryAdminAuthorListingContainer } from '../../../author/containers/library-admin-author-listing/library-admin-author-listing.component';
import { LibraryAdminBookTypeListingContainer } from '../../../book-type/containers/library-admin-book-type-listing/library-admin-book-type-listing.container';
import { LibraryAdminBookListingContainer } from '../../../book/containers/library-admin-book-listing/library-admin-book-listing.container';
import { LibraryAdminGameSystemListingContainer } from '../../../game-system/containers/library-admin-game-system-listing/library-admin-game-system-listing.container';
import { LibraryAdminPublisherListingContainer } from '../../../publisher/containers/library-admin-publisher-listing/library-admin-publisher-listing.container';

@Component({
    selector: 'assoc-library-admin-listing',
    imports: [CommonModule, RouterModule, IconsModule, CardModule, LibraryAdminBookListingContainer, LibraryAdminBookTypeListingContainer, LibraryAdminGameSystemListingContainer, LibraryAdminAuthorListingContainer, LibraryAdminPublisherListingContainer, ArticleComponent, PaginationInfoComponent],
    templateUrl: './library-admin-listing.component.html'
})
export class LibraryAdminListingContainer implements OnInit {

  public view = 'books';

  public get createPermission() {
    let permission;
    switch (this.view) {
      case 'authors':
        permission = this.createAuthorPermission;
        break;
      case 'books':
        permission = this.createBookPermission;
        break;
      case 'book_types':
        permission = this.createBookTypePermission;
        break;
      case 'game_systems':
        permission = this.createGameSystemPermission;
        break;
      case 'publishers':
        permission = this.createPublisherPermission;
        break;
      default:
        permission = false;
    }

    return permission;
  }

  public get creationRoute() {
    let route;
    switch (this.view) {
      case 'authors':
        route = "author/add";
        break;
      case 'books':
        route = "book/add";
        break;
      case 'book_types':
        route = "bookType/add";
        break;
      case 'game_systems':
        route = "gameSystem/add";
        break;
      case 'publishers':
        route = "publisher/add";
        break;
      default:
        route = '';
    }

    return route;
  }

  public data = new PaginatedResponse<any[]>([]);

  public pageNumber = 0;

  public waiting = true;

  public downloading = false;

  public tabs = [
    new CardTab('books', 'Libros'), new CardTab('authors', 'Autores'), new CardTab('publishers', 'Editores'),
    new CardTab('book_types', 'Tipos'), new CardTab('game_systems', 'Sistemas')
  ];

  private createBookPermission = false;

  private createBookTypePermission = false;

  private createGameSystemPermission = false;

  private createAuthorPermission = false;

  private createPublisherPermission = false;

  constructor(
    private authContainer: AuthContainer,
    private reportService: BookReportService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createBookPermission = this.authContainer.hasPermission("library_book", "create");
    this.createBookTypePermission = this.authContainer.hasPermission("library_book_type", "create");
    this.createGameSystemPermission = this.authContainer.hasPermission("library_game_system", "create");
    this.createAuthorPermission = this.authContainer.hasPermission("library_author", "create");
    this.createPublisherPermission = this.authContainer.hasPermission("library_publisher", "create");
  }

  public onChangeView(newView = 'books') {
    this.view = newView;
  }

  public onWait(wait: boolean) {
    this.waiting = wait;
    this.cdr.detectChanges();
  }

  public load(page: number) {
    this.pageNumber = page;
  }

  public onChangePage(page: PaginatedResponse<any[]>) {
    this.data = page;
  }

  public downloadExcel() {
    this.downloading = true;

    this.reportService.downloadExcelReport().subscribe({
      next: response => {
        // Reactivate view
        this.downloading = false;
      },
      error: error => {
        // Reactivate view
        this.downloading = false;
      }
    });
  }

}
