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
            loadComponent: () => import('./author/library-admin-author-list/library-admin-author-list').then(m => m.LibraryAdminAuthorList),
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
          }
        ]
      },
      {
        path: 'publishers',
        data: { breadcrumb: 'Editores' },
        children: [
          {
            path: '',
            loadComponent: () => import('./publisher/library-admin-publisher-list/library-admin-publisher-list').then(m => m.LibraryAdminPublisherList),
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
            loadComponent: () => import('./book-type/library-admin-book-type-list/library-admin-book-type-list').then(m => m.LibraryAdminBookTypeList),
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
            loadComponent: () => import('./game-system/library-admin-game-system-list/library-admin-game-system-list').then(m => m.LibraryAdminGameSystemList),
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
            loadComponent: () => import('./lending/library-admin-lending-list/library-admin-lending-list').then(m => m.LibraryAdminLendingList),
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
