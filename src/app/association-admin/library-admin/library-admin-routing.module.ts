import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';


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
            loadComponent: () => import('./author/containers/library-admin-author-list/library-admin-author-list.component').then(m => m.LibraryAdminAuthorListContainer),
            canActivate: [ResourceGuard("library_author", "view")],
            data: { breadcrumb: '' }
          }
        ]
      },
      {
        path: 'books',
        data: { breadcrumb: 'Libros' },
        children: [
          {
            path: '',
            loadComponent: () => import('./book/containers/library-admin-book-list/library-admin-book-list.container').then(m => m.LibraryAdminBookListContainer),
            canActivate: [ResourceGuard("library_book", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: 'game/register',
            loadComponent: () => import('./book/containers/library-admin-game-book-creation/library-admin-game-book-creation.container').then(m => m.LibraryAdminGameBookCreationContainer),
            canActivate: [ResourceGuard("library_book", "create")],
            data: { breadcrumb: 'Registrar libro' }
          },
          {
            path: 'game/:number',
            loadComponent: () => import('./book/containers/library-admin-game-book-edition/library-admin-game-book-edition.container').then(m => m.LibraryAdminGameBookEditionContainer),
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Editar libro' }
          },
          {
            path: 'game/:number/lend',
            loadComponent: () => import('./book/containers/library-admin-book-lending-lending/library-admin-book-lending-lending.container').then(m => m.LibraryAdminBookLendingLendContainer),
            canActivate: [ResourceGuard("library_lending", "update")],
            data: { breadcrumb: 'Préstamo' }
          },
          {
            path: 'game/:number/return',
            loadComponent: () => import('./book/containers/library-admin-book-lending-returning/library-admin-book-lending-returning.container').then(m => m.LibraryAdminBookLendingReturnContainer),
            canActivate: [ResourceGuard("library_lending", "update")],
            data: { breadcrumb: 'Devolución' }
          },
          {
            path: 'fiction/register',
            loadComponent: () => import('./book/containers/library-admin-fiction-book-creation/library-admin-fiction-book-creation.container').then(m => m.LibraryAdminFictionBookCreationContainer),
            canActivate: [ResourceGuard("library_book", "create")],
            data: { breadcrumb: 'Registrar libro' }
          },
          {
            path: 'fiction/:number',
            loadComponent: () => import('./book/containers/library-admin-fiction-book-edition/library-admin-fiction-book-edition.container').then(m => m.LibraryAdminFictionBookEditionContainer),
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Editar libro' }
          },
          {
            path: 'fiction/:number/lend',
            loadComponent: () => import('./book/containers/library-admin-book-lending-lending/library-admin-book-lending-lending.container').then(m => m.LibraryAdminBookLendingLendContainer),
            canActivate: [ResourceGuard("library_lending", "update")],
            data: { breadcrumb: 'Préstamo' }
          },
          {
            path: 'fiction/:number/return',
            loadComponent: () => import('./book/containers/library-admin-book-lending-returning/library-admin-book-lending-returning.container').then(m => m.LibraryAdminBookLendingReturnContainer),
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
            loadComponent: () => import('./publisher/containers/library-admin-publisher-list/library-admin-publisher-list.container').then(m => m.LibraryAdminPublisherListContainer),
            canActivate: [ResourceGuard("library_publisher", "view")],
            data: { breadcrumb: '' }
          }
        ]
      },
      {
        path: 'types',
        data: { breadcrumb: 'Tipos' },
        children: [
          {
            path: '',
            loadComponent: () => import('./book-type/containers/library-admin-book-type-list/library-admin-book-type-list.container').then(m => m.LibraryAdminBookTypeListContainer),
            canActivate: [ResourceGuard("library_book_type", "view")],
            data: { breadcrumb: '' }
          }
        ]
      },
      {
        path: 'systems',
        data: { breadcrumb: 'Sistemas' },
        children: [
          {
            path: '',
            loadComponent: () => import('./game-system/containers/library-admin-game-system-list/library-admin-game-system-list.container').then(m => m.LibraryAdminGameSystemListContainer),
            canActivate: [ResourceGuard("library_game_system", "view")],
            data: { breadcrumb: '' }
          }
        ]
      },
      {
        path: 'lendings',
        data: { breadcrumb: 'Préstamos' },
        children: [
          {
            path: '',
            loadComponent: () => import('./lending/containers/library-admin-lending-list/library-admin-lending-list.container').then(m => m.LibraryAdminLendingListContainer),
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
