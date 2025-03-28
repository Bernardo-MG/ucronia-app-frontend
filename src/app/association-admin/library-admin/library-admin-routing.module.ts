import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { LibraryAdminAuthorCreateContainer } from './author/containers/library-admin-author-creation/library-admin-author-creation.container';
import { LibraryAdminAuthorInfoEditorContainer } from './author/containers/library-admin-author-edition/library-admin-author-edition.container';
import { LibraryAdminAuthorListingContainer } from './author/containers/library-admin-author-listing/library-admin-author-listing.component';
import { LibraryAdminBookTypeCreateContainer } from './book-type/containers/library-admin-book-type-creation/library-admin-book-type-creation.container';
import { LibraryAdminBookTypeInfoEditorContainer } from './book-type/containers/library-admin-book-type-info-editor/library-admin-book-type-info-editor.container';
import { LibraryAdminBookTypeListingContainer } from './book-type/containers/library-admin-book-type-listing/library-admin-book-type-listing.container';
import { LibraryAdminFictionBookCreationContainer } from './fiction-book/containers/library-admin-fiction-book-creation/library-admin-fiction-book-creation.container';
import { LibraryAdminFictionBookInfoEditorContainer } from './fiction-book/containers/library-admin-fiction-book-edition/library-admin-fiction-book-edition.container';
import { LibraryAdminFictionBookLendingLendContainer } from './fiction-book/containers/library-admin-fiction-book-lending-lending/library-admin-fiction-book-lending-lending.container';
import { LibraryAdminFictionBookLendingReturnContainer } from './fiction-book/containers/library-admin-fiction-book-lending-returning/library-admin-fiction-book-lending-returning.container';
import { LibraryAdminFictionBookListingContainer } from './fiction-book/containers/library-admin-fiction-book-listing/library-admin-fiction-book-listing.container';
import { LibraryAdminGameBookCreationContainer } from './game-book/containers/library-admin-game-book-creation/library-admin-game-book-creation.container';
import { LibraryAdminGameBookInfoEditorContainer } from './game-book/containers/library-admin-game-book-edition/library-admin-game-book-edition.container';
import { LibraryAdminGameBookLendingLendContainer } from './game-book/containers/library-admin-game-book-lending-lending/library-admin-game-book-lending-lending.container';
import { LibraryAdminGameBookLendingReturnContainer } from './game-book/containers/library-admin-game-book-lending-returning/library-admin-game-book-lending-returning.container';
import { LibraryAdminGameBookListingContainer } from './game-book/containers/library-admin-game-book-listing/library-admin-game-book-listing.container';
import { LibraryAdminGameSystemCreateContainer } from './game-system/containers/library-admin-game-system-creation/library-admin-game-system-creation.container';
import { LibraryAdminGameSystemInfoEditorContainer } from './game-system/containers/library-admin-game-system-edition/library-admin-game-system-edition.container';
import { LibraryAdminGameSystemListingContainer } from './game-system/containers/library-admin-game-system-listing/library-admin-game-system-listing.container';
import { LibraryAdminLendingListingContainer } from './lending/containers/library-admin-lending-listing/library-admin-lending-listing.container';
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
        redirectTo: 'books',
        pathMatch: 'full'
      },
      {
        path: 'authors',
        data: { breadcrumb: 'Autores' },
        children: [
          {
            path: '',
            component: LibraryAdminAuthorListingContainer,
            canActivate: [ResourceGuard("library_author", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'register',
            component: LibraryAdminAuthorCreateContainer,
            canActivate: [ResourceGuard("library_author", "create")],
            data: { breadcrumb: 'Registrar autor' }
          },
          {
            path: ':number',
            component: LibraryAdminAuthorInfoEditorContainer,
            canActivate: [ResourceGuard("library_author", "read")],
            data: { breadcrumb: 'Editar autor' }
          }
        ]
      },
      {
        path: 'books',
        data: { breadcrumb: 'Libros' },
        children: [
          {
            path: 'game',
            data: { breadcrumb: 'Juegos' },
            children: [
              {
                path: '',
                component: LibraryAdminGameBookListingContainer,
                canActivate: [ResourceGuard("library_book", "view")],
                data: { breadcrumb: '' }
              },
              {
                path: 'register',
                component: LibraryAdminGameBookCreationContainer,
                canActivate: [ResourceGuard("library_book", "create")],
                data: { breadcrumb: 'Registrar libro' }
              },
              {
                path: ':number',
                component: LibraryAdminGameBookInfoEditorContainer,
                canActivate: [ResourceGuard("library_book", "read")],
                data: { breadcrumb: 'Editar libro' }
              },
              {
                path: ':number/lend',
                component: LibraryAdminGameBookLendingLendContainer,
                canActivate: [ResourceGuard("library_lending", "update")],
                data: { breadcrumb: 'Préstamo' }
              },
              {
                path: ':number/return',
                component: LibraryAdminGameBookLendingReturnContainer,
                canActivate: [ResourceGuard("library_lending", "update")],
                data: { breadcrumb: 'Devolución' }
              }
            ]
          },
          {
            path: 'fiction',
            data: { breadcrumb: 'Ficción' },
            children: [
              {
                path: '',
                component: LibraryAdminFictionBookListingContainer,
                canActivate: [ResourceGuard("library_book", "view")],
                data: { breadcrumb: '' }
              },
              {
                path: 'register',
                component: LibraryAdminFictionBookCreationContainer,
                canActivate: [ResourceGuard("library_book", "create")],
                data: { breadcrumb: 'Registrar libro' }
              },
              {
                path: ':number',
                component: LibraryAdminFictionBookInfoEditorContainer,
                canActivate: [ResourceGuard("library_book", "read")],
                data: { breadcrumb: 'Editar libro' }
              },
              {
                path: ':number/lend',
                component: LibraryAdminFictionBookLendingLendContainer,
                canActivate: [ResourceGuard("library_lending", "update")],
                data: { breadcrumb: 'Préstamo' }
              },
              {
                path: ':number/return',
                component: LibraryAdminFictionBookLendingReturnContainer,
                canActivate: [ResourceGuard("library_lending", "update")],
                data: { breadcrumb: 'Devolución' }
              }
            ]
          }
        ]
      },
      {
        path: 'publishers',
        data: { breadcrumb: 'Editores' },
        children: [
          {
            path: '',
            component: LibraryAdminPublisherListingContainer,
            canActivate: [ResourceGuard("library_publisher", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'register',
            component: LibraryAdminPublisherCreateContainer,
            canActivate: [ResourceGuard("library_publisher", "create")],
            data: { breadcrumb: 'Registrar editor' }
          },
          {
            path: ':number',
            component: LibraryAdminPublisherInfoEditorContainer,
            canActivate: [ResourceGuard("library_publisher", "read")],
            data: { breadcrumb: 'Editar editor' }
          }
        ]
      },
      {
        path: 'types',
        data: { breadcrumb: 'Tipos' },
        children: [
          {
            path: '',
            component: LibraryAdminBookTypeListingContainer,
            canActivate: [ResourceGuard("library_book_type", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'register',
            component: LibraryAdminBookTypeCreateContainer,
            canActivate: [ResourceGuard("library_book_type", "create")],
            data: { breadcrumb: 'Registrar tipo' }
          },
          {
            path: ':number',
            component: LibraryAdminBookTypeInfoEditorContainer,
            canActivate: [ResourceGuard("library_book_type", "read")],
            data: { breadcrumb: 'Editar tipo' }
          }
        ]
      },
      {
        path: 'systems',
        data: { breadcrumb: 'Sistemas' },
        children: [
          {
            path: '',
            component: LibraryAdminGameSystemListingContainer,
            canActivate: [ResourceGuard("library_game_system", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'register',
            component: LibraryAdminGameSystemCreateContainer,
            canActivate: [ResourceGuard("library_game_system", "create")],
            data: { breadcrumb: 'Registrar sistema' }
          },
          {
            path: ':number',
            component: LibraryAdminGameSystemInfoEditorContainer,
            canActivate: [ResourceGuard("library_game_system", "read")],
            data: { breadcrumb: 'Editar sistema' }
          }
        ]
      },
      {
        path: 'lendings',
        data: { breadcrumb: 'Préstamos' },
        children: [
          {
            path: '',
            component: LibraryAdminLendingListingContainer,
            canActivate: [ResourceGuard("library_lending", "view")],
            data: { breadcrumb: '' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
