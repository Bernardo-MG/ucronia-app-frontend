import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryAdminAuthorCreateContainer } from './author/containers/library-admin-author-creation/library-admin-author-creation.container';
import { LibraryAdminAuthorInfoEditorContainer } from './author/containers/library-admin-author-edition/library-admin-author-edition.container';
import { LibraryAdminAuthorListingContainer } from './author/containers/library-admin-author-listing/library-admin-author-listing.component';
import { LibraryAdminBookTypeCreateContainer } from './book-type/containers/library-admin-book-type-creation/library-admin-book-type-creation.container';
import { LibraryAdminBookTypeInfoEditorContainer } from './book-type/containers/library-admin-book-type-info-editor/library-admin-book-type-info-editor.container';
import { LibraryAdminBookTypeListingContainer } from './book-type/containers/library-admin-book-type-listing/library-admin-book-type-listing.container';
import { LibraryAdminBookCreationContainer } from './book/containers/library-admin-book-creation/library-admin-book-creation.container';
import { LibraryAdminBookInfoEditorContainer } from './book/containers/library-admin-book-edition/library-admin-book-edition.container';
import { LibraryAdminBookListingContainer } from './book/containers/library-admin-book-listing/library-admin-book-listing.container';
import { LibraryAdminListingContainer } from './frontpage/containers/library-admin-listing/library-admin-listing.component';
import { LibraryAdminGameSystemCreateContainer } from './game-system/containers/library-admin-game-system-creation/library-admin-game-system-creation.container';
import { LibraryAdminGameSystemInfoEditorContainer } from './game-system/containers/library-admin-game-system-edition/library-admin-game-system-edition.container';
import { LibraryAdminGameSystemListingContainer } from './game-system/containers/library-admin-game-system-listing/library-admin-game-system-listing.container';
import { BookLendingLendContainer } from './lending/containers/book-lending-lending/book-lending-lending.container';
import { BookLendingReturnContainer } from './lending/containers/book-lending-returning/book-lending-returning.component';
import { LibraryAdminPublisherCreateContainer } from './publisher/containers/library-admin-publisher-creation/library-admin-publisher-creation.container';
import { LibraryAdminPublisherInfoEditorContainer } from './publisher/containers/library-admin-publisher-edition/library-admin-publisher-edition.container';
import { LibraryAdminPublisherListingContainer } from './publisher/containers/library-admin-publisher-listing/library-admin-publisher-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Biblioteca' },
    children: [
      {
        path: '',
        component: LibraryAdminListingContainer,
        canActivate: [ResourceGuard("library_admin", "view")],
        data: { breadcrumb: '' }
      },
      {
        path: 'authors',
        component: LibraryAdminAuthorListingContainer,
        canActivate: [ResourceGuard("library_author", "view")],
        data: { breadcrumb: 'Autores' }
      },
      {
        path: 'books',
        component: LibraryAdminBookListingContainer,
        canActivate: [ResourceGuard("library_book", "view")],
        data: { breadcrumb: 'Libros' }
      },
      {
        path: 'publishers',
        component: LibraryAdminPublisherListingContainer,
        canActivate: [ResourceGuard("library_publisher", "view")],
        data: { breadcrumb: 'Editores' }
      },
      {
        path: 'types',
        component: LibraryAdminBookTypeListingContainer,
        canActivate: [ResourceGuard("library_book_type", "view")],
        data: { breadcrumb: 'Tipos' }
      },
      {
        path: 'systems',
        component: LibraryAdminGameSystemListingContainer,
        canActivate: [ResourceGuard("library_game_system", "view")],
        data: { breadcrumb: 'Sistemas' }
      },
      {
        path: 'book/add',
        component: LibraryAdminBookCreationContainer,
        canActivate: [ResourceGuard("library_book", "create")],
        data: { breadcrumb: 'Registrar libro' }
      },
      {
        path: 'book/:number',
        component: LibraryAdminBookInfoEditorContainer,
        canActivate: [ResourceGuard("library_book", "read")],
        data: { breadcrumb: 'Editar libro' }
      },
      {
        path: 'book/:number/lend',
        component: BookLendingLendContainer,
        canActivate: [ResourceGuard("library_lending", "update")],
        data: { breadcrumb: 'Préstamo' }
      },
      {
        path: 'book/:number/return',
        component: BookLendingReturnContainer,
        canActivate: [ResourceGuard("library_lending", "update")],
        data: { breadcrumb: 'Devolución' }
      },
      {
        path: 'author/add',
        component: LibraryAdminAuthorCreateContainer,
        canActivate: [ResourceGuard("library_author", "create")],
        data: { breadcrumb: 'Registrar autor' }
      },
      {
        path: 'author/:number',
        component: LibraryAdminAuthorInfoEditorContainer,
        canActivate: [ResourceGuard("library_author", "read")],
        data: { breadcrumb: 'Editar autor' }
      },
      {
        path: 'bookType/add',
        component: LibraryAdminBookTypeCreateContainer,
        canActivate: [ResourceGuard("library_book_type", "create")],
        data: { breadcrumb: 'Registrar tipo' }
      },
      {
        path: 'bookType/:number',
        component: LibraryAdminBookTypeInfoEditorContainer,
        canActivate: [ResourceGuard("library_book_type", "read")],
        data: { breadcrumb: 'Editar tipo' }
      },
      {
        path: 'gameSystem/add',
        component: LibraryAdminGameSystemCreateContainer,
        canActivate: [ResourceGuard("library_game_system", "create")],
        data: { breadcrumb: 'Registrar sistema' }
      },
      {
        path: 'gameSystem/:number',
        component: LibraryAdminGameSystemInfoEditorContainer,
        canActivate: [ResourceGuard("library_game_system", "read")],
        data: { breadcrumb: 'Editar sistema' }
      },
      {
        path: 'publisher/add',
        component: LibraryAdminPublisherCreateContainer,
        canActivate: [ResourceGuard("library_publisher", "create")],
        data: { breadcrumb: 'Registrar editor' }
      },
      {
        path: 'publisher/:number',
        component: LibraryAdminPublisherInfoEditorContainer,
        canActivate: [ResourceGuard("library_publisher", "read")],
        data: { breadcrumb: 'Editar editor' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
