import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { LibraryAdminAuthorCreateContainer } from './author/containers/library-admin-author-creation/library-admin-author-creation.container';
import { LibraryAdminAuthorInfoEditorContainer } from './author/containers/library-admin-author-edition/library-admin-author-edition.container';
import { LibraryAdminAuthorListingContainer } from './author/containers/library-admin-author-listing/library-admin-author-listing.component';
import { LibraryAdminBookTypeCreateContainer } from './book-type/containers/library-admin-book-type-creation/library-admin-book-type-creation.container';
import { LibraryAdminBookTypeInfoEditorContainer } from './book-type/containers/library-admin-book-type-info-editor/library-admin-book-type-info-editor.container';
import { LibraryAdminBookTypeListingContainer } from './book-type/containers/library-admin-book-type-listing/library-admin-book-type-listing.container';
import { LibraryAdminBookCreationContainer } from './book/containers/library-admin-book-creation/library-admin-book-creation.container';
import { LibraryAdminBookInfoEditorContainer } from './book/containers/library-admin-book-edition/library-admin-book-edition.container';
import { LibraryAdminBookLendingLendContainer } from './book/containers/library-admin-book-lending-lending/library-admin-book-lending-lending.container';
import { LibraryAdminBookLendingReturnContainer } from './book/containers/library-admin-book-lending-returning/library-admin-book-lending-returning.container';
import { LibraryAdminBookListingContainer } from './book/containers/library-admin-book-listing/library-admin-book-listing.container';
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
            path: '',
            component: LibraryAdminBookListingContainer,
            canActivate: [ResourceGuard("library_book", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'register',
            component: LibraryAdminBookCreationContainer,
            canActivate: [ResourceGuard("library_book", "create")],
            data: { breadcrumb: 'Registrar libro' }
          },
          {
            path: ':number',
            component: LibraryAdminBookInfoEditorContainer,
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Editar libro' }
          },
          {
            path: ':number/lend',
            component: LibraryAdminBookLendingLendContainer,
            canActivate: [ResourceGuard("library_lending", "update")],
            data: { breadcrumb: 'Préstamo' }
          },
          {
            path: ':number/return',
            component: LibraryAdminBookLendingReturnContainer,
            canActivate: [ResourceGuard("library_lending", "update")],
            data: { breadcrumb: 'Devolución' }
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
