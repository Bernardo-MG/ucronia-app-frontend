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
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/data/library-admin-author-list/library-admin-author-list').then(m => m.LibraryAdminAuthorList),
                canActivate: [ResourceGuard("library_author", "view")]
              }
            ]
          },
          {
            path: 'books',
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/book/library-admin-book-list/library-admin-book-list').then(m => m.LibraryAdminBookList),
                canActivate: [ResourceGuard("library_book", "view")]
              }
            ]
          },
          {
            path: 'publishers',
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/data/library-admin-publisher-list/library-admin-publisher-list').then(m => m.LibraryAdminPublisherList),
                canActivate: [ResourceGuard("library_publisher", "view")]
              }
            ]
          },
          {
            path: 'types',
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/data/library-admin-book-type-list/library-admin-book-type-list').then(m => m.LibraryAdminBookTypeList),
                canActivate: [ResourceGuard("library_book_type", "view")]
              }
            ]
          },
          {
            path: 'systems',
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/data/library-admin-game-system-list/library-admin-game-system-list').then(m => m.LibraryAdminGameSystemList),
                canActivate: [ResourceGuard("library_game_system", "view")]
              }
            ]
          },
          {
            path: 'lendings',
            children: [
              {
                path: '',
                loadComponent: () => import('./library-admin/lending/library-admin-lending-list/library-admin-lending-list').then(m => m.LibraryAdminLendingList),
                canActivate: [ResourceGuard("library_lending", "view")]
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
