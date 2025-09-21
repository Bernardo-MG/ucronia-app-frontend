import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'people',
        canActivate: [ResourceGuard("person", "view")],
        loadComponent: () => import('./people/people-list/people-list').then(m => m.PeopleList)
      },
      {
        path: 'library',
        canActivate: [ResourceGuard("library_admin", "view")],
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
                loadComponent: () => import('./library-admin/author/library-admin-author-list/library-admin-author-list').then(m => m.LibraryAdminAuthorList),
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
                loadComponent: () => import('./library-admin/book/library-admin-book-list/library-admin-book-list').then(m => m.LibraryAdminBookList),
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
                loadComponent: () => import('./library-admin/publisher/library-admin-publisher-list/library-admin-publisher-list').then(m => m.LibraryAdminPublisherList),
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
                loadComponent: () => import('./library-admin/book-type/library-admin-book-type-list/library-admin-book-type-list').then(m => m.LibraryAdminBookTypeList),
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
                loadComponent: () => import('./library-admin/game-system/library-admin-game-system-list/library-admin-game-system-list').then(m => m.LibraryAdminGameSystemList),
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
                loadComponent: () => import('./library-admin/lending/library-admin-lending-list/library-admin-lending-list').then(m => m.LibraryAdminLendingList),
                canActivate: [ResourceGuard("library_lending", "view")],
                data: { breadcrumb: '' }
              }
            ]
          }
        ]
      },
      {
        path: 'fees',
        canActivate: [ResourceGuard("fee", "view")],
        loadComponent: () => import('./fees/fee-list/fee-list').then(m => m.FeeList)
      },
      {
        path: 'funds',
        canActivate: [ResourceGuard("funds", "view")],
        loadComponent: () => import('./funds/funds/funds').then(m => m.Funds)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationAdminRoutingModule { }
