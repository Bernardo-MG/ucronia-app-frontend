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
        loadComponent: () => import('./containers/library-listing/library-listing.container').then(m => m.LibraryListingContainer),
        canActivate: [ResourceGuard("library", "view")],
        data: { breadcrumb: 'Libros' }
      },
      {
        path: 'games/:index',
        loadComponent: () => import('./containers/library-game-book-info/library-game-book-info.container').then(m => m.LibraryGameBookInfoContainer),
        canActivate: [ResourceGuard("library_book", "read")],
        data: { breadcrumb: 'Juego' }
      },
      {
        path: 'fiction/:index',
        loadComponent: () => import('./containers/library-fiction-book-info/library-fiction-book-info.container').then(m => m.LibraryFictionBookInfoContainer),
        canActivate: [ResourceGuard("library_book", "read")],
        data: { breadcrumb: 'Ficción' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
